import { dbConnect } from "@/app/db/db";
import { ClickModel } from "@/app/schemas/user-url-clicks.Schema";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    const analytics = await ClickModel.aggregate([
      {
        $lookup: {
          from: "urls",
          localField: "urlId",
          foreignField: "_id",
          as: "url",
        },
      },
      { $unwind: "$url" },

      {
        $match: {
          "url.userId": new mongoose.Types.ObjectId(userId),
        },
      },

      {
        $facet: {
          totalClicks: [{ $count: "count" }],

          clicksPerCountry: [
            { $group: { _id: "$country", count: { $sum: 1 } } },
          ],

          clicksPerDevice: [{ $group: { _id: "$device", count: { $sum: 1 } } }],

          clicksPerDay: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                  },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);

    const result = analytics[0];

    return NextResponse.json(
      {
        message: "Success",
        totalClicks: result.totalClicks[0]?.count || 0,
        clicksPerCountry: result.clicksPerCountry,
        clicksPerDevice: result.clicksPerDevice,
        clicksPerDay: result.clicksPerDay,
        clicksPerWeek: result.clicksPerWeek,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 },
    );
  }
}
