import { dbConnect } from "@/app/db/db";
import { ClickModel, UrlModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } },
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

    const urlDoc = await UrlModel.findOneAndUpdate(
      { shortCode },
      { $inc: { clicks: 1 } },
      { new: true },
    );

    if (!urlDoc) {
      return NextResponse.json(
        { message: "Short URL not found" },
        { status: 404 },
      );
    }
    await ClickModel.create({
      urlId: urlDoc._id,
      country: "India",
      device: "Desktop",
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
