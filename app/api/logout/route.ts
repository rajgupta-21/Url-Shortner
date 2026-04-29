import { NextResponse } from "next/server";

export default async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout Succesfull" },
      { status: 200 },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    NextResponse.json(
      { message: "Error in LogoutRoute", error },
      { status: 400 },
    );
  }
}
