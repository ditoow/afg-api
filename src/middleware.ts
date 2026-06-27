import { NextRequest, NextResponse } from "next/server"

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:8080", "http://127.0.0.1:3000", "http://127.0.0.1:5173", "http://127.0.0.1:8080"]

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? ""
  const isAllowed = allowedOrigins.includes(origin)

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  }

  if (isAllowed) {
    corsHeaders["Access-Control-Allow-Origin"] = origin
    corsHeaders["Access-Control-Allow-Credentials"] = "true"
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders })
  }

  const response = NextResponse.next()
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: "/api/:path*",
}
