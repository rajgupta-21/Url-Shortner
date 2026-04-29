import { dbConnect } from "@/app/db/db";
import { ClickModel } from "@/app/schemas/user-url-clicks.Schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { urlId: string } },
) {
  const { urlId } = params;

  try {
    await dbConnect();

    const objectUrlId = new mongoose.Types.ObjectId(urlId);

    const analytics = await ClickModel.aggregate([
      {
        $match: { urlId: objectUrlId },
      },
      {
        $facet: {
          totalClicks: [{ $count: "count" }],

          clicksPerCountry: [
            {
              $group: {
                _id: "$country",
                count: { $sum: 1 },
              },
            },
          ],

          clicksPerDevice: [
            {
              $group: {
                _id: "$device",
                count: { $sum: 1 },
              },
            },
          ],

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

          clicksPerWeek: [
            {
              $group: {
                _id: { $week: "$createdAt" },
                count: { $sum: 1 },
              },
            },
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
