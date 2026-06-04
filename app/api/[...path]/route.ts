import { NextRequest, NextResponse } from "next/server";

function backendBaseUrl(): string {
  return (
    process.env.BEACON_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://beacon-admit-mvp-wiog6d4qpa-uc.a.run.app"
  ).replace(/\/$/, "");
}

function adminKey(): string {
  return process.env.ONBOARDING_ADMIN_SHARED_KEY || process.env.ADMIN_API_SHARED_KEY || "";
}

function buildBackendUrl(request: NextRequest, pathParts: string[]): string {
  const backendUrl = new URL(`${backendBaseUrl()}/api/${pathParts.join("/")}`);
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
    const key = adminKey();
    if (!key) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Server-side ONBOARDING_ADMIN_SHARED_KEY or ADMIN_API_SHARED_KEY is not configured for admin proxy routes.",
        },
        { status: 500 },
      );
    }
    headers.set("x-beacon-admin-key", key);
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
