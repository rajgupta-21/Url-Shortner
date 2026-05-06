import { ClickModel, UrlModel } from "@/app/schemas/user-url-clicks.Schema";

import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Please login again" },
        { status: 401 },
      );
    }

    const userUrls = await UrlModel.find({ userId });

    const urlIds = userUrls.map((url) => url._id);

    await ClickModel.deleteMany({
      urlId: { $in: urlIds },
    });

    await UrlModel.deleteMany({ userId });

    return NextResponse.json(
      { message: "Successfully deleted all links" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
