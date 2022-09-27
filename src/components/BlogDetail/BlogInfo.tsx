import { useQuery } from "@tanstack/react-query";
import getBlog from "../../lib/fetch/getBlog";

const BlogInfo = ({ blogId }: { blogId: string }) => {
  const { data, isLoading, isError, error } = useQuery(["blogs", blogId], () =>
    getBlog(blogId)
  );

  if (isLoading) return null;
  if (isError && error instanceof Error) return <p>{error.message}</p>;

  if (typeof data === "string") return <p>{data}</p>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, content, timestamp, author, published, _id } = data[0];

  if (!published) return null;

  return (
    <div key={_id}>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{new Date(timestamp).toDateString()}</p>
      <p>{author}</p>
    </div>
  );
};

export default BlogInfo;