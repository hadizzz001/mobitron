import clientPromise from '../../lib/mongodb'; 
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const data = await collection.find().sort({ _id: -1 }).toArray();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*", // allow all domains
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
