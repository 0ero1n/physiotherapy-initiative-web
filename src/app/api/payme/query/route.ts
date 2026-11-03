import { NextRequest, NextResponse } from "next/server";
import { queryTransactionStatus } from "@/lib/payme";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { success: false, message: "Transaction reference is required." },
      { status: 400 }
    );
  }

  const result = await queryTransactionStatus(reference);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const reference = body?.reference;

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Transaction reference is required." },
        { status: 400 }
      );
    }

    const result = await queryTransactionStatus(reference);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Error querying transaction status.";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
