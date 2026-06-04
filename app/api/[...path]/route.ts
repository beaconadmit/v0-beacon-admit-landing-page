import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL = (
  process.env.BEACON_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8080"
).replace(/\/$/, "");

const ADMIN_KEY =
  process.env.ONBOARDING_ADMIN_SHARED_KEY || process.env.ADMIN_API_SHARED_KEY || "";

function buildBackendUrl(request: NextRequest, pathParts: string[]): string {
  const backendUrl = new URL(`${BACKEND_BASE_URL}/api/${pathParts.join("/")}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    backendUrl.searchParams.append(key, value);
  });
  return backendUrl.toString();
}

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const backendUrl = buildBackendUrl(request, path || []);
  const headers = new Headers();

  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const inviteToken = request.headers.get("x-onboarding-invite-token");
  if (inviteToken) headers.set("x-onboarding-invite-token", inviteToken);

  // Keep admin secrets server-side. Browser code should never use NEXT_PUBLIC_ADMIN_API_KEY.
  if (path?.[0] === "admin") {
    if (!ADMIN_KEY) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Server-side ONBOARDING_ADMIN_SHARED_KEY or ADMIN_API_SHARED_KEY is not configured for admin proxy routes.",
        },
        { status: 500 },
      );
    }
    headers.set("x-beacon-admin-key", ADMIN_KEY);
  }

  const method = request.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);

  const response = await fetch(backendUrl, {
    method,
    headers,
    body: hasBody ? await request.text() : undefined,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  const responseContentType = response.headers.get("content-type");
  if (responseContentType) responseHeaders.set("content-type", responseContentType);

  return new NextResponse(await response.text(), {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
