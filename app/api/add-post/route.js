import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";

export async function POST(req) {
    try {
        await connectMongo();

        const { title, description, image } = await req.json();

        if (!title || !description) {
            return Response.json({ message: "Title and Description are required!" }, { status: 400 });
        }

        const post = await PostModel.create({ title, description, image });

        return Response.json({ message: "Post has been created successfully!", post }, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message || "Something went wrong" }, { status: 500 });
    }
}
