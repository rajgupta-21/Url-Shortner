import { dbConnect } from "@/app/db/db";
import { authCookieOptions, createToken } from "@/app/lib/auth";
import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, lastName, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const fullName = lastName ? `${name} ${lastName}` : name;
    const hashedPass = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: fullName,
      email,
      password: hashedPass,
    });

    const token = createToken({ id: user._id.toString(), email: user.email });

    const response = NextResponse.json(
      {
        message: "User created successfully",
        userId: user._id,
        email: user.email,
        plan: user.plan,
      },
      { status: 201 },
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
