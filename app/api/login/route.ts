import { dbConnect } from "@/app/db/db";
import { authCookieOptions, createToken } from "@/app/lib/auth";
import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = createToken({ id: user._id.toString(), email: user.email });

    const response = NextResponse.json(
      {
        message: "Login successful",
        userId: user._id,
        plan: user.plan,
        email: user.email,
      },
      { status: 200 },
    );

    response.cookies.set("token", token, authCookieOptions);

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
