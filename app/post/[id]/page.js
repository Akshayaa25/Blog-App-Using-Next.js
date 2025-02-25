import Post from "@/components/Post";

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`)
      .then((response) => response.json());

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
