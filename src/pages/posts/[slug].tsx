import styles from "./styles.module.scss";

export default function Post() {
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
            <span>19 abr 2021</span>

            <span>Rosana Moreira</span>
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
             19 abr 2021
            </span>

            <span>
            
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
