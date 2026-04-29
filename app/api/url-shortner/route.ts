import { dbConnect } from "@/app/db/db";
import { UrlModel } from "@/app/schemas/user-url-clicks.Schema";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 },
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
      };
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token", err },
        { status: 401 },
      );
    }

    const userId = decoded.id;

    const shortCode = Math.random().toString(36).substring(2, 8);

    await UrlModel.create({
      originalUrl: url,
      shortCode,
      userId,
    });

    return NextResponse.json(
      {
        message: "Short URL created successfully",
        shortUrl: `http://localhost:3000/${shortCode}`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
