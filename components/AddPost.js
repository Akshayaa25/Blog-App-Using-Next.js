"use client";
import { useState } from "react";

export default function AddPost() {
  const [inputs, setInputs] = useState({ title: "", description: "", image: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send post data to API
    const response = await fetch("/api/add-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setMessage("✅ " + data.message);
      setInputs({ title: "", description: "", image: "" });
    } else {
      setMessage("❌ " + data.message);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Add Post</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center mb-4">
          <label htmlFor="title" className="w-1/4">Blog Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputs}
            value={inputs.title}
            className="border rounded px-2 py-1 w-3/4"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="image" className="w-1/4">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={handleInputs}
            value={inputs.image}
            className="border rounded px-2 py-1 w-3/4"
            placeholder="Paste Image URL"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="description" className="w-1/4">Description:</label>
          <textarea
            id="description"
            name="description"
            onChange={handleInputs}
            value={inputs.description}
            className="border rounded px-2 py-1 w-3/4"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </main>
  );
}
