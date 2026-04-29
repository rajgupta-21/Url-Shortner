import { dbConnect } from "@/app/db/db";
import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { message: "UserId is required" },
        { status: 400 },
      );
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "Couldnt find User" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { message: "Successfully fetched users", user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Somthing went wrong", error },
      { status: 400 },
    );
  }
}
