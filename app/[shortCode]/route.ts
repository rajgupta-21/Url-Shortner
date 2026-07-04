import { dbConnect } from "@/app/db/db";
import { detectDevice } from "@/app/lib/device";
import { ClickModel, UrlModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  try {
    await dbConnect();

    const { shortCode } = await params;

    if (!shortCode) {
      return NextResponse.json(
        { message: "Short code is required" },
        { status: 400 },
      );
    }

    const urlDoc = await UrlModel.findOne({ shortCode });

    if (!urlDoc) {
      return NextResponse.json(
        { message: "Short URL not found" },
        { status: 404 },
      );
    }

    if (!urlDoc.isActive) {
      return NextResponse.json(
        { message: "This link has been disabled" },
        { status: 410 },
      );
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    const userAgent = req.headers.get("user-agent") || "";

    await ClickModel.create({
      urlId: urlDoc._id,
      country: "Unknown",
      device: detectDevice(userAgent),
      ip: req.headers.get("x-forwarded-for") || "unknown",
    });

    return NextResponse.redirect(urlDoc.originalUrl, { status: 302 });
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
