"use client";
import { useState, useEffect } from "react";

export default function Post({ params }) {
  const id = params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/post/" + id)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 p-10">Loading...</p>;
  }

  return (
    <>
      {post && (
        <main className="container mx-auto px-4 py-6 mb-[100px]">
          <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-500">{post.created_at_formatted}</p>
          <img
            width={400}
            height={300}
            src={post.image}
            alt="Post Image"
            className="my-4"
          />
          <p>{post.description}</p>
        </main>
      )}
    </>
  );
}
