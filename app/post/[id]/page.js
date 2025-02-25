import Post from "@/components/Post";

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`);
    const text = await response.text();
    const post = JSON.parse(text);

    return {
      title: post?.title || "Post Not Found",
    };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "Error Loading Post",
    };
  }
}

export default function Page({ params }) {
  return <Post params={params} />;
}
