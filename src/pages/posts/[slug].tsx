import { GetStaticProps } from "next";
import { getPrismicClient } from "../../Services/prismic";
import styles from "./styles.module.scss";


export default function Post() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Como utilizar hooks</h1>
          <p>
            Um breve arquivo sobre a origem da ferramenta que facilitou o acesso
            de databases e ampliou produtividade para o ecossistema
            JavaScript/TypeScript
          </p>
        </div>
      </main>
    </>
  );
}
