import { NextRequest, NextResponse } from "next/server"
import { cafes } from "@/data/cafes"
import type { CafeListItem } from "@/data/cafes"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const area = searchParams.get("area")
  const search = searchParams.get("search")

  let result: CafeListItem[] = cafes.map(
    ({ id, name, rating, reviewCount, priceRange, area, category, thumbnail }) => ({
      id,
      name,
      rating,
      reviewCount,
      priceRange,
      area,
      category,
      thumbnail,
    })
  )

  if (category) {
    result = result.filter((c) => c.category === category)
  }

  if (area) {
    result = result.filter(
      (c) => c.area.toLowerCase() === area.toLowerCase()
    )
  }

  if (search) {
    const q = search.toLowerCase()
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q) ||
        c.category.includes(q)
    )
  }

  return NextResponse.json({
    success: true,
    data: result,
  })
}
