import { NextResponse } from "next/server"

export async function POST() {
  const agentId = process.env.RETELL_AGENT_ID
  const apiKey = process.env.RETELL_API_KEY

  if (!agentId || !apiKey) {
    return NextResponse.json(
      { error: "Retell API credentials not configured" },
      { status: 500 }
    )
  }

  try {
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Retell API error:", errorData)
      return NextResponse.json(
        { error: errorData.message || "Failed to create web call" },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Return the access token to the client
    return NextResponse.json({
      access_token: data.access_token,
      call_id: data.call_id,
    })
  } catch (error) {
    console.error("[v0] Error creating web call:", error)
    return NextResponse.json(
      { error: "Failed to create web call" },
      { status: 500 }
    )
  }
}
