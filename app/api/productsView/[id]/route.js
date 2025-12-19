import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const revalidate = 10;

// Handle preflight (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  console.log("PATCH id: ", id);

  try {
    const client = await clientPromise;
    const db = client.db("test"); // Your DB name
    const collection = db.collection("Product"); // Your collection name

    // Fetch the current document
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return new NextResponse(
        JSON.stringify({ error: "Document not found" }),
        {
          status: 404,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    // Convert views to int, increment by 1
    const currentViews = parseInt(doc.views || "0", 10); // default 0 if not set
    const newViews = currentViews + 1;

    // Update the document, storing as string
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { views: newViews.toString() } }
    );

    // Fetch the updated document
    const updatedDoc = await collection.findOne({ _id: new ObjectId(id) });

    return new NextResponse(JSON.stringify(updatedDoc), {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Error updating views in MongoDB:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update views" }),
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}
