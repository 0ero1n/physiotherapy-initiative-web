import { NextRequest, NextResponse } from "next/server";
import {
  formatPhoneNumber,
  initiateCardCheckout,
  initiateMobileCollection,
  RATES_TO_TZS,
} from "@/lib/payme";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      method,
      amount,
      currency = "TZS",
      name,
      email,
      phone,
      cause = "General Fund",
      billingAddress = "Dar es Salaam",
      billingCity = "Dar es Salaam",
      billingCountry = "TZ",
    } = body;

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Please specify a valid contribution amount." },
        { status: 400 }
      );
    }

    const donorName = name || body.fullName || body.donorName;

    if (!donorName || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    // Convert to TZS for Payme Africa operator settlement
    const rate = RATES_TO_TZS[currency.toUpperCase()] || 1;
    const amountInTZS = Math.round(numAmount * rate);

    if (amountInTZS < 500) {
      return NextResponse.json(
        {
          success: false,
          message: "Minimum contribution amount is 500 TZS (or approx. $0.20 USD).",
        },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const reference = `TPI_${timestamp}_${randomSuffix}`;

    // Split name into first and last name
    const nameParts = (donorName || "").trim().split(" ");
    const firstName = nameParts[0] || "Valued";
    const lastName = nameParts.slice(1).join(" ") || "Supporter";

    if (method === "mobile") {
      if (!phone) {
        return NextResponse.json(
          {
            success: false,
            message: "Mobile phone number is required for Mobile Money payments.",
          },
          { status: 400 }
        );
      }

      const formattedPhone = formatPhoneNumber(phone);
      if (!formattedPhone || formattedPhone.length < 9) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please provide a valid phone number (e.g. 0765 359 305 or 255765359305).",
          },
          { status: 400 }
        );
      }

      const result = await initiateMobileCollection(
        {
          amount: amountInTZS,
          msisdn: formattedPhone,
          reference,
        },
        { donorName, cause }
      );

      return NextResponse.json({
        ...result,
        amountInTZS,
        originalAmount: numAmount,
        originalCurrency: currency,
      });
    }

    if (method === "card") {
      const formattedPhone = phone ? formatPhoneNumber(phone) : "255765359305";

      const result = await initiateCardCheckout(
        {
          amount: amountInTZS,
          reference,
          billingFirstName: firstName,
          billingLastName: lastName,
          billingEmail: email,
          billingPhone: formattedPhone,
          billingAddress,
          billingCity,
          billingCountry,
        },
        { donorName, cause }
      );

      return NextResponse.json({
        ...result,
        amountInTZS,
        originalAmount: numAmount,
        originalCurrency: currency,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid payment method. Must be 'mobile' or 'card'.",
      },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Internal server error processing payment.";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
