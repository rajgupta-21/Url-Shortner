import { dbConnect } from "@/app/db/db";
import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import { UserValidation } from "@/app/utils/validation";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { updatedName, updatedEmail, userId } = UserValidation.parse(body);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: updatedName,
        email: updatedEmail,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Successfully updated user",
        updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.flatten(),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
