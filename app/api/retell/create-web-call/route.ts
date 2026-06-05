import { NextRequest, NextResponse } from "next/server"

/** Map of profile keys to their environment variable agent IDs */
const AGENT_ID_MAP: Record<string, string | undefined> = {
  detox: process.env.NEXT_PUBLIC_RETELL_AGENT_DETOX,
  iop: process.env.NEXT_PUBLIC_RETELL_AGENT_IOP,
  mental_health: process.env.NEXT_PUBLIC_RETELL_AGENT_MENTAL_HEALTH,
}

/**
 * Creates a Retell web call session.
 * Accepts an optional `agent_profile` in the request body to select
 * the Detox, IOP, or Mental Health agent. Falls back to the default
 * RETELL_AGENT_ID if no profile is provided or the profile ID is missing.
 */
export async function POST(request: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Retell API credentials not configured" },
      { status: 500 }
    )
  }

  let agentId = process.env.RETELL_AGENT_ID!

  try {
    const body = await request.json().catch(() => ({}))
    const profile = body.agent_profile as string | undefined

    if (profile && AGENT_ID_MAP[profile]) {
      agentId = AGENT_ID_MAP[profile]!
    }
  } catch {
    // Fall through — use default agent ID
  }

  if (!agentId) {
    return NextResponse.json(
      { error: "No agent ID configured for this profile" },
      { status: 500 }
    )
  }

  try {
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[retell] API error:", errorData)
      return NextResponse.json(
        { error: errorData.message || "Failed to create web call" },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      access_token: data.access_token,
      call_id: data.call_id,
    })
  } catch (error) {
    console.error("[retell] Error creating web call:", error)
    return NextResponse.json(
      { error: "Failed to create web call" },
      { status: 500 }
    )
  }
}
