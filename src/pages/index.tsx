import { format } from "date-fns";
import { FiCalendar, FiUser } from "react-icons/fi";
import styles from "./home.module.scss";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../Services/prismic";
import { useState } from "react";
import { PrismicDocument, Query } from "@prismicio/types";
import { ptBR } from "date-fns/locale";
import { formatPosts } from "../utils/formatPosts";
import Link from "next/link";

interface Post {
  uid?: string;
  first_publication_date: string | null;

  data: {
    title: string;
    subtitle: string;
    author: string;
    excerpt: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
  children?: JSX.Element | JSX.Element[];
}
export default function Home({
  postsPagination,
  children,
}: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(formatPosts(postsPagination.results));
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function loadMorePosts(): Promise<void> {
    const data: Query<PrismicDocument<Record<string, any>, string, string>> =
      await fetch(`${nextPage}`).then((response) => response.json());

    setNextPage(data.next_page);

    const newPosts: Post[] = data.results.map((post) => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          "dd MMM yyyy",
          { locale: ptBR }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
          excerpt: post.data.content,
        },
      };
    });

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  }
  return (
    <main className={styles.main}>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post.uid}`} key={post.uid}>
            <div className={styles.container}>
              <a>
                <h1>{post.data.title}</h1>
              </a>
              <h3>{post.data.excerpt}</h3>

              <div className={styles.author}>
                <span>
                  <FiCalendar /> {post.first_publication_date}
                </span>

                <span>
                  <FiUser /> {post.data.author}
                </span>
              </div>
            </div>
          </Link>
        );
      })}

      <div className={styles.morePosts}>
        {nextPage && (
          <button type="button" onClick={loadMorePosts}>
            carregar mais posts
          </button>
        )}
      </div>
    </main>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType("post", { pageSize: 5 });

  const posts: Post[] = postsResponse.results.map((post) => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,

      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
        excerpt:
          post.data.content.find((content) => content.type === "paragraph")
            ?.text ?? "",
      },
    };
  });
  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
