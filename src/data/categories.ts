export type Category = {
  id: number
  name: string
  slug: string
  icon: string
}

export const categories: Category[] = [
  { id: 1, name: "Coffee Shop", slug: "coffee-shop", icon: "☕" },
  { id: 2, name: "Cafe & Eatery", slug: "cafe-eatery", icon: "🍽️" },
  { id: 3, name: "Slowbar", slug: "slowbar", icon: "🧪" },
  { id: 4, name: "Rooftop", slug: "rooftop", icon: "🌇" },
  { id: 5, name: "Industrial", slug: "industrial", icon: "🏭" },
  { id: 6, name: "Alam & Outdoor", slug: "alam-outdoor", icon: "🌿" },
  { id: 7, name: "24 Jam", slug: "24-jam", icon: "🕐" },
]
