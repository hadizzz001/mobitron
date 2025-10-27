import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 10;

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

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("Product");

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const rawSearch = searchParams.get("q");
    const rawCat = searchParams.get("cat");
    const rawSub = searchParams.get("sub");
    const rawBrnd = searchParams.get("brnd");
    const rawSizes = searchParams.getAll("size");

    const search = rawSearch?.trim();
    const cat = rawCat?.trim();
    const sub = rawSub?.trim();
    const brnd = rawBrnd?.trim();
    const sizes = rawSizes.map((s) => s.trim());

    const query = {};

    // 🔍 Fuzzy search
    if (search) {
      if (search.toLowerCase() === "moto") {
        query.category = "moto";
      } else {
        const tokens = search.split(/\s+/).filter(Boolean);
        query.$and = tokens.map((token) => ({
          $or: [
            { title: { $regex: token, $options: "i" } },
            { category: { $regex: token, $options: "i" } },
            { sub: { $regex: token, $options: "i" } },
            { factory: { $regex: token, $options: "i" } },
            { "color.sizes.size": { $regex: token, $options: "i" } },
            { "color.name": { $regex: token, $options: "i" } },
          ],
        }));
      }
    }

    if (cat) {
      if (cat === "yes") {
        query.arrival = "yes";
      } else {
        query.category = { $regex: `^${cat}\\s*$`, $options: "i" };
      }
    }

    if (sub) query.sub = { $regex: `^${sub}\\s*$`, $options: "i" };
    if (brnd) query.factory = { $regex: `^${brnd}\\s*$`, $options: "i" };
    if (sizes.length > 0) query["color.sizes.size"] = { $in: sizes };

    const total = await collection.countDocuments(query);

    // ✅ Aggregation pipeline to sort properly
    const data = await collection
      .aggregate([
        { $match: query },
        {
          $addFields: {
            // convert sort to a number, or null if missing
            sortNumeric: {
              $cond: {
                if: { $regexMatch: { input: { $toString: "$sort" }, regex: /^[0-9]+$/ } },
                then: { $toInt: "$sort" },
                else: null,
              },
            },
          },
        },
        {
          $sort: {
            // 1. Items with numeric sort first, ordered ascending
            sortNumeric: 1,
            // 2. Missing/null sort go after
            sort: 1,
            // 3. Tiebreaker by _id
            _id: 1,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray();

    return new NextResponse(
      JSON.stringify({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore: page * limit < total,
        products: data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error fetching data from MongoDB:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
