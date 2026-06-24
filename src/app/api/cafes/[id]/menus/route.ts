import { NextRequest, NextResponse } from "next/server"
import { cafes } from "@/data/cafes"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const cafeId = Number(id)
  const cafe = cafes.find((c) => c.id === cafeId)

  if (!cafe) {
    return NextResponse.json(
      { success: false, message: "Cafe not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: cafe.menus,
  })
}
