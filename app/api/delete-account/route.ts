import { dbConnect } from "@/app/db/db";
import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "No email found" }, { status: 400 });
    }
    const response = await UserModel.deleteOne({ email });
    if (response.deletedCount === 1) {
      return NextResponse.json(
        { message: "Error in deleting user" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "successfully deleted an user" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "somthing went wrong" },
      { status: 400 },
    );
  }
}
