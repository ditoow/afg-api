import type { Metadata } from "next"
import ApiDocs from "./api-docs"

export const metadata: Metadata = {
  title: "API Docs — Tempat Nongkrong Semarang",
  description: "Interactive API documentation for coffee shop data in Semarang",
}

export default function Home() {
  return <ApiDocs />
}
