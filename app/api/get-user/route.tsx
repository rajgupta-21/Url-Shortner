import { dbConnect } from "@/app/db/db";
import { RedisClient } from "@/app/lib/redisClient";
import { UserModel } from "@/app/schemas/user-url-clicks.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const redis = await RedisClient();
    if (!redis) {
      return NextResponse.json(
        { message: "Error connecting to Redis" },
        { status: 500 },
      );
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "UserId is required" },
        { status: 400 },
      );
    }

    const cachedUser = await redis.get(`user:${userId}`);

    if (cachedUser) {
      return NextResponse.json(
        {
          message: "User fetched from Redis cache",
          user: JSON.parse(cachedUser),
        },
        { status: 200 },
      );
    }

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "Could not find user" },
        { status: 404 },
      );
    }

    await redis.set(`user:${userId}`, JSON.stringify(user), {
      EX: 1000, //cache for 1000 seconds
    });

    return NextResponse.json(
      {
        message: "User fetched from MongoDB",
        user,
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
