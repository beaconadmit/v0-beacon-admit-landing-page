import { NextRequest, NextResponse } from "next/server"

/**
 * Maps tier IDs and billing cycles to Stripe Price ID environment variable names.
 */
const PRICE_MAP: Record<string, Record<string, string>> = {
  starter: {
    monthly: "STRIPE_PRICE_STARTER_MONTHLY",
    annual: "STRIPE_PRICE_STARTER_ANNUAL",
  },
  growth: {
    monthly: "STRIPE_PRICE_GROWTH_MONTHLY",
    annual: "STRIPE_PRICE_GROWTH_ANNUAL",
  },
}

/**
 * POST /api/stripe/create-checkout
 * Creates a Stripe Checkout Session for the requested tier/cycle.
 *
 * Request body: { tierId: string, cycle: "monthly" | "annual" }
 * Response: { url: string } or { error: string }
 */
export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Please add STRIPE_SECRET_KEY to your environment variables.",
      },
      { status: 503 },
    )
  }

  const body = await request.json()
  const { tierId, cycle } = body as {
    tierId?: string
    cycle?: string
  }

  if (!tierId || !cycle) {
    return NextResponse.json(
      { error: "Missing tierId or cycle in request body." },
      { status: 400 },
    )
  }

  const envKey = PRICE_MAP[tierId]?.[cycle]
  if (!envKey) {
    return NextResponse.json(
      { error: `Invalid tier "${tierId}" or cycle "${cycle}".` },
      { status: 400 },
    )
  }

  const priceId = process.env[envKey]
  if (!priceId) {
    return NextResponse.json(
      {
        error: `Stripe Price ID not configured for ${tierId}/${cycle}. Set ${envKey} in your environment variables.`,
      },
      { status: 503 },
    )
  }

  const origin = request.nextUrl.origin

  // Use Stripe API directly to avoid adding the full Stripe SDK as a dependency.
  const checkoutResponse = await fetch(
    "https://api.stripe.com/v1/checkout/sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "success_url": `${origin}/pricing?checkout=success`,
        "cancel_url": `${origin}/pricing?checkout=cancelled`,
        "allow_promotion_codes": "true",
        "billing_address_collection": "required",
        "subscription_data[trial_period_days]": "14",
      }),
    },
  )

  if (!checkoutResponse.ok) {
    const errorData = await checkoutResponse.json()
    console.error("Stripe Checkout error:", errorData)
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    )
  }

  const session = await checkoutResponse.json()
  return NextResponse.json({ url: session.url })
}
