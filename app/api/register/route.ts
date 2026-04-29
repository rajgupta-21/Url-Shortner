import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, lastName, email, password } = await req.json();

    if (!name || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
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

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      lastName,
      email,
      password: hashedPass,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
        token,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
}
