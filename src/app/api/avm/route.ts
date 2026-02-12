import { NextResponse } from "next/server";
import { runAVM } from "@/lib/ai/avm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = runAVM({
      surface: body.surface,
      pricePerM2: body.pricePerM2,
      locationScore: body.locationScore,
      conditionScore: body.conditionScore,
      marketTrend: body.marketTrend
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid AVM request" },
      { status: 400 }
    );
  }
}