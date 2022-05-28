import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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

export function formatPosts(posts: Post[]): Post[] {
  const formattedPost = posts.map((post) =>
    post.first_publication_date
      ? {
          ...post,
          first_publication_date: format(
            new Date(post.first_publication_date),
            "dd MMM yyyy",
            { locale: ptBR }
          ),
        }
      : post
  );
  return formattedPost;
}
