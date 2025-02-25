"use client"
import { useState } from "react";

export default function Contact() {
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState("");

    const handleInputs = (e) => {
        setInputs((prevState) => { return { ...prevState, [e.target.name]: e.target.value } })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/enquiry', {
            method: 'POST',
            body: JSON.stringify(inputs)
        })
        .then((response) => response.json())
        .then((data) => {
            setMessage(data.message);
            setInputs({});
            setTimeout(() => {
                setMessage("")
            }, 3000);
        })
    }

    return (
        <main className="container mx-auto px-4 py-6">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="flex items-center mb-4">
                    <label htmlFor="name" className="w-1/4">Name:</label>
                    <input type="text" id="name" name="name" onChange={handleInputs} value={inputs.name ?? ""} className="border rounded px-2 py-1 w-3/4" />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="email" className="w-1/4">Email:</label>
                    <input type="email" id="email" name="email" onChange={handleInputs} value={inputs.email ?? ""} className="border rounded px-2 py-1 w-3/4" />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="message" className="w-1/4">Message:</label>
                    <textarea id="message" name="message" onChange={handleInputs} value={inputs.message ?? ""} className="border rounded px-2 py-1 w-3/4" rows="4"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
            {message && <p> {message} </p>}
        </main>
    )
}
