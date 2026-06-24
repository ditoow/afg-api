"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MagnifyingGlass,
  Copy,
  Check,
  Play,
  X,
  List,
  MapPin,
} from "@phosphor-icons/react";

type Endpoint = {
  method: "GET";
  path: string;
  title: string;
  description: string;
  group: string;
  params: Param[];
  queryParams: Param[];
  exampleResponse: unknown;
};

type Param = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/cafes",
    title: "Daftar Semua Cafe",
    description:
      "Mengambil seluruh daftar tempat nongkrong di Semarang. Mendukung filter berdasarkan kategori, area, dan pencarian teks.",
    group: "Cafes",
    params: [],
    queryParams: [
      {
        name: "category",
        type: "string",
        required: false,
        description:
          "Filter by category slug (e.g. industrial, slowbar, rooftop)",
      },
      {
        name: "area",
        type: "string",
        required: false,
        description: "Filter by area name (e.g. Tembalang, Kota Lama)",
      },
      {
        name: "search",
        type: "string",
        required: false,
        description: "Cari berdasarkan nama, area, atau kategori",
      },
    ],
    exampleResponse: {
      success: true,
      data: [
        {
          id: 1,
          name: "KOV Koffie",
          slug: "kov-koffie",
          thumbnail: "/images/kov-koffie.jpg",
          rating: 4.6,
          reviewCount: 312,
          priceRange: "Rp20-45rb",
          area: "Candisari",
          categorySlug: "industrial",
          categoryName: "Industrial",
        },
      ],
    },
  },
  {
    method: "GET",
    path: "/api/cafes/:id",
    title: "Detail Cafe",
    description:
      "Mengambil informasi lengkap satu tempat nongkrong berdasarkan ID.",
    group: "Cafes",
    params: [
      {
        name: "id",
        type: "number",
        required: true,
        description: "ID unik cafe (1-11)",
      },
    ],
    queryParams: [],
    exampleResponse: {
      success: true,
      data: {
        id: 1,
        name: "KOV Koffie",
        rating: 4.6,
        reviewCount: 312,
        priceRange: "Rp20-45rb",
        area: "Candisari",
        description:
          "Coffee shop dengan konsep industrial minimalis yang buka 24 jam...",
        address: "Jl. Sultan Agung No.135, Kaliwiru, Kec. Candisari",
        hours: "24 jam (setiap hari)",
        phone: "0858-8083-3418",
        instagram: "@kovkoffie",
        gallery: ["/images/kov-1.jpg"],
        facilities: ["WiFi", "Colokan", "AC", "Rooftop", "Parkir Luas"],
        categoryId: 5,
      },
    },
  },
  {
    method: "GET",
    path: "/api/categories",
    title: "Daftar Kategori",
    description:
      "Mengambil seluruh kategori tempat nongkrong. Cocok untuk filter chips atau dropdown.",
    group: "Categories",
    params: [],
    queryParams: [],
    exampleResponse: {
      success: true,
      data: [
        { id: 1, name: "Coffee Shop", slug: "coffee-shop", icon: "☕" },
        { id: 2, name: "Cafe & Eatery", slug: "cafe-eatery", icon: "🍽️" },
        { id: 3, name: "Slowbar", slug: "slowbar", icon: "🧪" },
        { id: 4, name: "Rooftop", slug: "rooftop", icon: "🌇" },
        { id: 5, name: "Industrial", slug: "industrial", icon: "🏭" },
        { id: 6, name: "Alam & Outdoor", slug: "alam-outdoor", icon: "🌿" },
        { id: 7, name: "24 Jam", slug: "24-jam", icon: "🕐" },
      ],
    },
  },
  {
    method: "GET",
    path: "/api/cafes/:id/menus",
    title: "Menu Cafe",
    description: "Mengambil daftar menu makanan dan minuman dari sebuah cafe.",
    group: "Menus",
    params: [
      { name: "id", type: "number", required: true, description: "ID cafe" },
    ],
    queryParams: [],
    exampleResponse: {
      success: true,
      data: [
        {
          id: 1,
          name: "Es Kopi Nako",
          description: "Espresso susu gula aren",
          price: 23000,
          category: "Kopi",
          isRecommended: true,
        },
        {
          id: 8,
          name: "Mie Ayam Nako",
          description: "Mie ayam dengan topping melimpah",
          price: 37000,
          category: "Makanan",
          isRecommended: false,
        },
      ],
    },
  },
  {
    method: "GET",
    path: "/api/cafes/:id/menus/:menuId",
    title: "Detail Menu",
    description: "Mengambil detail satu item menu dari sebuah cafe.",
    group: "Menus",
    params: [
      { name: "id", type: "number", required: true, description: "ID cafe" },
      {
        name: "menuId",
        type: "number",
        required: true,
        description: "ID menu item",
      },
    ],
    queryParams: [],
    exampleResponse: {
      success: true,
      data: {
        id: 1,
        name: "Es Kopi Nako",
        description: "Espresso susu gula aren",
        price: 23000,
        category: "Kopi",
        isRecommended: true,
        cafeName: "KOV Koffie",
      },
    },
  },
  {
    method: "GET",
    path: "/api/cafes/:id/reviews",
    title: "Review Cafe",
    description: "Mengambil daftar review pengunjung untuk sebuah cafe.",
    group: "Reviews",
    params: [
      { name: "id", type: "number", required: true, description: "ID cafe" },
    ],
    queryParams: [],
    exampleResponse: {
      success: true,
      data: [
        {
          id: 1,
          author: "Rina S.",
          avatar: "",
          rating: 5,
          comment: "Tempatnya nyaman banget buat WFC...",
          date: "2026-05-20",
        },
      ],
    },
  },
];

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  POST: { bg: "bg-blue-500/10", text: "text-blue-400" },
  PUT: { bg: "bg-amber-500/10", text: "text-amber-400" },
  DELETE: { bg: "bg-red-500/10", text: "text-red-400" },
};

function formatJson(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}

function highlightJson(json: string): React.ReactNode[] {
  const lines = json.split("\n");
  return lines.map((line, i) => {
    const colored = line
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/: null/g, ': <span class="json-null">null</span>');
    return (
      <span
        key={i}
        dangerouslySetInnerHTML={{ __html: colored }}
        className="block"
      />
    );
  });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono
        text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all duration-200"
    >
      {copied ? (
        <Check size={13} className="text-emerald-400" />
      ) : (
        <Copy size={13} />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function EndpointNav({
  endpoints,
  activePath,
  onSelect,
  searchQuery,
}: {
  endpoints: Endpoint[];
  activePath: string;
  onSelect: (ep: Endpoint) => void;
  searchQuery: string;
}) {
  const q = searchQuery.toLowerCase();
  const filtered = q
    ? endpoints.filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.path.toLowerCase().includes(q) ||
          ep.group.toLowerCase().includes(q),
      )
    : null;

  const renderEndpoint = (ep: Endpoint) => (
    <button
      key={ep.path}
      onClick={() => onSelect(ep)}
      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-150 group ${
        activePath === ep.path
          ? "bg-zinc-800/70 ring-1 ring-zinc-700/50"
          : "hover:bg-zinc-800/40"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
            methodColors[ep.method].bg
          } ${methodColors[ep.method].text}`}
        >
          {ep.method}
        </span>
        <span className="text-xs text-zinc-400 font-mono truncate flex-1">
          {ep.path}
        </span>
      </div>
      <p className="text-[11px] text-zinc-500 mt-0.5 pl-1">{ep.title}</p>
    </button>
  );

  if (filtered) {
    return (
      <nav className="flex flex-col gap-0.5 px-1">
        {filtered.length === 0 ? (
          <p className="text-xs text-zinc-600 text-center py-8">
            No endpoints found
          </p>
        ) : (
          filtered.map(renderEndpoint)
        )}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-0.5 px-1">
      {endpoints.map(renderEndpoint)}
    </nav>
  );
}

function TryItPanel({
  endpoint,
  baseUrl,
}: {
  endpoint: Endpoint;
  baseUrl: string;
}) {
  const [params, setParams] = useState<Record<string, string>>({});
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const buildUrl = useCallback(() => {
    let url = `${baseUrl}${endpoint.path}`;
    for (const p of endpoint.params) {
      url = url.replace(`:${p.name}`, params[p.name] || `:${p.name}`);
    }
    const qs = Object.entries(queryParams)
      .filter(([, v]) => v)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    if (qs.length) url += `?${qs.join("&")}`;
    return url;
  }, [endpoint, params, queryParams, baseUrl]);

  useEffect(() => {
    setParams({});
    setQueryParams({});
    setResponse(null);
    setStatus(null);
  }, [endpoint]);

  async function handleSend() {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    try {
      const url = buildUrl();
      const res = await fetch(url);
      const text = await res.text();
      setStatus(res.status);
      try {
        const parsed = JSON.parse(text);
        setResponse(JSON.stringify(parsed, null, 2));
      } catch {
        setResponse(text);
      }
    } catch {
      setStatus(0);
      setResponse(
        '{\n  "error": "Network error — make sure the server is running"\n}',
      );
    } finally {
      setLoading(false);
      responseRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  const hasParams = endpoint.params.length > 0;
  const hasPlaceholder = endpoint.params.some((p) => !params[p.name]);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h4 className="text-sm font-medium text-zinc-200">Try it</h4>
          <span className="text-[10px] text-zinc-600 font-mono">
            — real request against running server
          </span>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 ring-1 ring-zinc-800 rounded-xl px-4 py-3 font-mono text-sm">
          <span
            className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
              methodColors[endpoint.method].bg
            } ${methodColors[endpoint.method].text}`}
          >
            {endpoint.method}
          </span>
          <span className="text-zinc-300 truncate flex-1">{buildUrl()}</span>
          <CopyButton text={`curl -X ${endpoint.method} "${buildUrl()}"`} />
        </div>
      </div>

      {hasParams && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {endpoint.params.map((p) => (
            <div key={p.name} className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="font-mono">{p.name}</span>
                {p.required && <span className="text-red-400">*</span>}
                <span className="text-zinc-600">({p.type})</span>
              </label>
              <input
                value={params[p.name] || ""}
                onChange={(e) =>
                  setParams({ ...params, [p.name]: e.target.value })
                }
                placeholder={p.description}
                className="w-full bg-zinc-900 ring-1 ring-zinc-800 rounded-lg px-3 py-2 text-sm
                  text-zinc-200 placeholder:text-zinc-600 font-mono
                  focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all duration-150"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSend}
          disabled={loading || hasPlaceholder}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
            bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 active:scale-[0.98]"
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <Play size={14} weight="fill" />
          )}
          {loading ? "Sending..." : "Send Request"}
        </button>
        {hasPlaceholder && !loading && (
          <span className="text-xs text-amber-500/80">
            Fill in required parameters first
          </span>
        )}
      </div>

      {response !== null && (
        <div ref={responseRef} className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-400">Response</span>
            {status && (
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                  status >= 200 && status < 300
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {status}
              </span>
            )}
          </div>
          <pre className="bg-zinc-900 ring-1 ring-zinc-800 rounded-xl p-4 text-xs leading-relaxed overflow-x-auto max-h-[400px]">
            {highlightJson(response)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function ApiDocs() {
  const [active, setActive] = useState<Endpoint>(endpoints[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState("http://localhost:3000");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const host = typeof window !== "undefined" ? window.location.origin : "";
    setBaseUrl(host);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-300 font-sans flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-zinc-950/80 backdrop-blur-2xl
          border-r border-zinc-800/50 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:translate-x-0 lg:h-[100dvh]`}
      >
        <div className="p-4 border-b border-zinc-800/50 relative">
          <div className="flex items-center justify-center mb-3">
            <span className="text-sm font-semibold text-zinc-100">Mobile AFG 2026</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-zinc-800 transition-colors absolute right-4"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          <EndpointNav
            endpoints={endpoints}
            activePath={active.path}
            onSelect={(ep) => {
              setActive(ep);
              setSidebarOpen(false);
            }}
            searchQuery={searchQuery}
          />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-2xl border-b border-zinc-800/50">
          <div className="flex items-center justify-between px-4 lg:px-8 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <List size={18} />
            </button>
            <div />
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-10">
          {/* Endpoint header */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg ${
                  methodColors[active.method].bg
                } ${methodColors[active.method].text}`}
              >
                {active.method}
              </span>
              <code className="text-sm font-mono text-zinc-100 bg-zinc-900 px-3 py-1.5 rounded-lg ring-1 ring-zinc-800/50">
                {active.path}
              </code>
              <CopyButton text={`${baseUrl}${active.path}`} />
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
              {active.description}
            </p>
          </section>

          {/* Parameters */}
          {(active.params.length > 0 || active.queryParams.length > 0) && (
            <section className="space-y-3">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Parameters
              </h3>
              <div className="ring-1 ring-zinc-800/50 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-900/50">
                      <th className="text-left px-4 py-2.5 text-xs text-zinc-500 font-medium">
                        Name
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs text-zinc-500 font-medium hidden sm:table-cell">
                        Type
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs text-zinc-500 font-medium w-16">
                        Required
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs text-zinc-500 font-medium hidden md:table-cell">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/30">
                    {[...active.params, ...active.queryParams].map((p) => (
                      <tr
                        key={p.name}
                        className="hover:bg-zinc-900/20 transition-colors"
                      >
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono text-zinc-200">
                            {p.name}
                          </code>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-zinc-500 hidden sm:table-cell font-mono">
                          {p.type}
                        </td>
                        <td className="px-4 py-2.5">
                          {p.required ? (
                            <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                              required
                            </span>
                          ) : (
                            <span className="text-[10px] text-zinc-600">
                              optional
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-xs text-zinc-500 hidden md:table-cell">
                          {p.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Try It */}
          <section className="border-t border-zinc-800/30 pt-8">
            <TryItPanel endpoint={active} baseUrl={baseUrl} />
          </section>

          {/* Example Response */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Example Response
              </h3>
              <CopyButton text={formatJson(active.exampleResponse)} />
            </div>
            <pre className="bg-zinc-900 ring-1 ring-zinc-800/50 rounded-xl p-4 lg:p-6 text-xs leading-relaxed overflow-x-auto">
              {highlightJson(formatJson(active.exampleResponse))}
            </pre>
          </section>

          <footer className="pt-8 border-t border-zinc-800/30 text-center">
            <p className="text-[11px] text-zinc-700">
              afg-api · Next.js 16 · TypeScript · Data real coffee shop Semarang
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
