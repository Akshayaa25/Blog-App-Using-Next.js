import Post from "@/components/Post";

export async function generateMetadata({params}) {
  const id = params.id;

  const post = await fetch(process.env.NEXT_PUBLIC_API_URL+'/post/'+id)
  .then((response) => response.json())

  return {
    title: post.title
  }
}

export default function Page({params}) {
    return <Post params={params}/>
}
