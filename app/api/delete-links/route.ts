import { dbConnect } from "@/app/db/db";
import { getAuthUser } from "@/app/lib/auth";
import { ClickModel, UrlModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const user = getAuthUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: please log in" },
        { status: 401 },
      );
    }

    const userUrls = await UrlModel.find({ userId: user.id });
    const urlIds = userUrls.map((url) => url._id);

    await ClickModel.deleteMany({ urlId: { $in: urlIds } });
    await UrlModel.deleteMany({ userId: user.id });

    return NextResponse.json(
      { message: "Successfully deleted all links" },
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
