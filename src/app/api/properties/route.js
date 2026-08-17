import { NextResponse } from "next/server";
import { getProperties } from "../../../lib/db";

export async function GET() {
  try {
    const data = await getProperties();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API GET route:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}
