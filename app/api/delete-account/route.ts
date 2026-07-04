import { dbConnect } from "@/app/db/db";
import { getAuthUser } from "@/app/lib/auth";
import {
  ClickModel,
  UrlModel,
  UserModel,
} from "@/app/schemas/user-url-clicks.Schema";
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

    // Remove the user's links and their click analytics first.
    const userUrls = await UrlModel.find({ userId: user.id });
    const urlIds = userUrls.map((url) => url._id);

    await ClickModel.deleteMany({ urlId: { $in: urlIds } });
    await UrlModel.deleteMany({ userId: user.id });

    const result = await UserModel.deleteOne({ _id: user.id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Could not delete account" },
        { status: 404 },
      );
    }

    const response = NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 },
    );

    // Clear the auth cookie since the account no longer exists.
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
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
