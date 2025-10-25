import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export const revalidate = 10;

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(request, { params }) {
  const { name } = params;

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const data = await collection.find({
      title: { $regex: name, $options: 'i' }
    }).toArray();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
