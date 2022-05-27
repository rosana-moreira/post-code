import { GetServerSideProps } from "next";
import { RichText } from "prismic-dom";
import { FiCalendar, FiUser } from "react-icons/fi";
import { getPrismicClient } from "../../Services/prismic";
import styles from "./styles.module.scss";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface PostWithContent {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    excerpt: string;
  };
}
interface PostProps {
  post: PostWithContent;
}
export default function Post({ post }: PostProps): JSX.Element {
  const [formattedPost] = useState({
    ...post,
    first_publication_date: format(
      new Date(post.first_publication_date),
      "dd MMM yyyy",
      { locale: ptBR }
    ),
  });
  return (
    <>
      <div
        style={{
          width: "100%",
          background: `url(${post.data.banner.url}) no-repeat center`,
          height: "20rem",
        }}
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>{post.data.title}</h1>
          <span>
            <FiCalendar /> {formattedPost.first_publication_date}
          </span>
          <span>
            <FiUser /> {post.data.author}
          </span>
          <h3>{post.data.subtitle}</h3>
          <p>{post.data.excerpt}</p>
        </div>
      </main>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient({ req });

  const response = await prismic.getByUID("post", String(slug));

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },

      excerpt: RichText.asText(response.data.content),
    },
  };
  console.log(post);
  return {
    props: {
      post,
    },
  };
};
