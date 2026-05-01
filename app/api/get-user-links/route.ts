import { dbConnect } from "@/app/db/db";
import { UrlModel } from "@/app/schemas/user-url-clicks.Schema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const userId = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }

    const links = await UrlModel.find(
      { userId: new mongoose.Types.ObjectId(userId) },
      { originalUrl: 1, shortCode: 1, clicks: 1, createdAt: 1, isActive: 1 },
    ).sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Successfully fetched links", links },
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
