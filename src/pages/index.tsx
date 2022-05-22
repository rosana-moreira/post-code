import Link from "next/link";
import Head from "next/head";
import { FiCalendar, FiUser } from "react-icons/fi";
import styles from "./home.module.scss";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../Services/prismic";
interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Como utilizar hooks</h1>
          <h3>
            Um breve arquivo sobre a origem da ferramenta que facilitou o acesso
            de databases e ampliou produtividade para o ecossistema
            JavaScript/TypeScript
          </h3>
          <div className={styles.author}>
            <span>
              <FiCalendar /> 19 abr 2021
            </span>

            <span>
          
              <FiUser />
              Rosana Moreira
            </span>
          </div>
        </div>
        <div className={styles.container}>
          <h1>Como utilizar hooks</h1>
          <h3>
            Um breve arquivo sobre a origem da ferramenta que facilitou o acesso
            de databases e ampliou produtividade para o ecossistema
            JavaScript/TypeScript
          </h3>
          <div className={styles.author}>
            <span>
              <FiCalendar /> 19 abr 2021
            </span>

            <span>
             
              <FiUser />
              Rosana Moreira
            </span>
          </div>
        </div>
        <div className={styles.morePosts}>
          <button type="button">carregar mais posts</button>
        </div>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.getByUID('document.type', 'post', {
    fetch: ["post.title"],
    pageSize: 1,
  })
console.log(postsResponse)
 
  return {
    props: {
      postsResponse
    },
    revalidate: 1800, // 30 minutos
  };
};