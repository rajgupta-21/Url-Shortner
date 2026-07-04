import { dbConnect } from "@/app/db/db";
import { getAuthUser } from "@/app/lib/auth";
import { getBaseUrl } from "@/app/lib/baseUrl";
import { UrlModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const user = getAuthUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: please log in" },
        { status: 401 },
      );
    }

    const shortCode = Math.random().toString(36).substring(2, 8);

    await UrlModel.create({
      originalUrl: url,
      shortCode,
      userId: user.id,
    });

    return NextResponse.json(
      {
        message: "Short URL created successfully",
        shortUrl: `${getBaseUrl(req)}/${shortCode}`,
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
