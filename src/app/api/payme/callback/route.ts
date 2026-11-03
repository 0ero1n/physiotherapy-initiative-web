import { NextRequest, NextResponse } from "next/server";
import { generatePaymeSignature, getPaymeConfig } from "@/lib/payme";

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    let body: Record<string, unknown> = {};
    try {
      body = JSON.parse(text);
    } catch {
      // not JSON
    }

    const config = getPaymeConfig();
    const signature = req.headers.get("x-signature");
    const timestamp = req.headers.get("x-timestamp");

    // Optional verification if signature headers are present
    if (signature && timestamp && config.appSecret) {
      const expected = generatePaymeSignature(
        JSON.stringify(body),
        parseInt(timestamp, 10),
        config.appSecret
      );

      if (signature !== expected) {
        console.warn("Payme webhook signature mismatch:", { signature, expected });
      }
    }

    console.log("Payme webhook notification received:", {
      reference: body.reference || body.trans_id,
      status: body.status,
      amount: body.amount,
      msisdn: body.msisdn,
      providerMessage: body.provider_message || body.message,
    });

    return NextResponse.json({
      received: true,
      reference: body.reference,
      status: body.status,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error processing webhook";
    console.error("Error processing Payme webhook:", message);
    return NextResponse.json(
      { received: false, error: message },
      { status: 500 }
    );
  }
}
