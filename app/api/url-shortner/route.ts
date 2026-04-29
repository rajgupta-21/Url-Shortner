import { dbConnect } from "@/app/db/db";
import { UrlModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }
    const shortCode = Math.random().toString(36).substring(2, 8);
    await UrlModel.create({
      originalUrl: url,
      shortCode,
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
      { message: "Something went wrong", error },
      { status: 500 },
    );
  }
}
