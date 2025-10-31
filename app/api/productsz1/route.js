import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 10;

// Handle preflight (CORS)
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

    // ✅ force-trim params before querying
    const search = rawSearch?.trim();
    const cat = rawCat?.trim();
    const sub = rawSub?.trim();
    const brnd = rawBrnd?.trim();
    const sizes = rawSizes.map((s) => s.trim());

    const query = {};

    // 🔍 FUZZY SEARCH (multi-word)
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

    // ✅ FIX: match category even if DB has spaces before/after
    if (cat) {
      if (cat === "yes") {
        query.arrival = "yes";
      } else {
        query.category = { $regex: `\\s*${cat}\\s*`, $options: "i" };
      }
    }

    // ✅ FIX: match subcategory even if DB has spaces before/after
    if (sub) query.sub = { $regex: `\\s*${sub}\\s*`, $options: "i" };

    // ✅ FIX: match brand/factory even if DB has spaces before/after
    if (brnd) query.factory = { $regex: `\\s*${brnd}\\s*`, $options: "i" };

    // size filter
    if (sizes.length > 0)
      query["color.sizes.size"] = { $in: sizes };

    const total = await collection.countDocuments(query);

    // ✅ SORT with fallback for items without sort number
    const data = await collection
      .aggregate([
        { $match: query },
        {
          $addFields: {
            sortNumeric: {
              $cond: [
                { $and: [{ $ifNull: ["$sort", false] }, { $ne: ["$sort", 0] }] },
                "$sort",
                Number.MAX_SAFE_INTEGER, // push undefined sort to bottom
              ],
            },
          },
        },
        { $sort: { sortNumeric: 1, _id: 1 } },
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
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
