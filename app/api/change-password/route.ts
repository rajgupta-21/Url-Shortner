import { dbConnect } from "@/app/db/db";
import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { oldPassword, userId, newPassword } = body;

    if (!oldPassword || !userId || !newPassword) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Old password is incorrect",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassQuery = await UserModel.updateOne(
      { _id: userId },
      {
        password: hashedPassword,
      },
    );

    if (updatedPassQuery.modifiedCount === 0) {
      return NextResponse.json(
        {
          message: "Could not update password",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Successfully updated password",
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
