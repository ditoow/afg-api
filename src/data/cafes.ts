export type CafeListItem = {
  id: number
  name: string
  rating: number
  reviewCount: number
  priceRange: string
  area: string
}

export type CafeDetail = CafeListItem & {
  description: string
  address: string
  hours: string
  phone: string
  instagram: string
}

export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  category: string
  isRecommended: boolean
}

export type CafeWithRelations = CafeDetail & {
  menus: MenuItem[]
}

export const cafes: CafeWithRelations[] = [
  {
    id: 1,
    name: "KOV Koffie",
    rating: 4.6,
    reviewCount: 312,
    priceRange: "Rp20-45rb",
    area: "Candisari",
    description:
      "Coffee shop dengan konsep industrial minimalis yang buka 24 jam. Terdiri dari tiga lantai dengan area rooftop yang nyaman. Cocok untuk work-from-cafe, nongkrong santai, atau meeting informal.",
    address: "Jl. Sultan Agung No.135, Kaliwiru, Kec. Candisari",
    hours: "24 jam (setiap hari)",
    phone: "0858-8083-3418",
    instagram: "@kovkoffie",
    menus: [
      { id: 1, name: "Es Kopi Nako", description: "Espresso susu gula aren", price: 23000, category: "Kopi", isRecommended: true },
      { id: 2, name: "Es Kopi Nako Setrong", description: "Double shot espresso susu", price: 25000, category: "Kopi", isRecommended: false },
      { id: 3, name: "Cappuccino ala Nako", description: "Cappuccino creamy khas", price: 29000, category: "Kopi", isRecommended: false },
      { id: 4, name: "Avocado Coffee", description: "Kopi dengan alpukat segar", price: 29000, category: "Kopi", isRecommended: true },
      { id: 5, name: "Manual Brew", description: "V60 / Aeropress specialty", price: 29000, category: "Kopi", isRecommended: false },
      { id: 6, name: "Matcha Latte", description: "Matcha asli Jepang dengan susu", price: 29000, category: "Non-Kopi", isRecommended: false },
      { id: 7, name: "Nasi Merem Melek", description: "Nasi goreng kekinian", price: 35000, category: "Makanan", isRecommended: true },
      { id: 8, name: "Mie Ayam Nako", description: "Mie ayam dengan topping melimpah", price: 37000, category: "Makanan", isRecommended: false },
    ],
  },
  {
    id: 2,
    name: "Dharma Boutique Roastery",
    rating: 4.8,
    reviewCount: 189,
    priceRange: "Rp25-60rb",
    area: "Semarang Barat",
    description:
      "Legenda specialty coffee di Semarang. Tempat ini terkenal dengan pengalaman slowbar yang personal dan edukatif. Kadang kamu bisa ngobrol langsung soal roasting dan sejarah kopi Semarang dengan baristanya.",
    address: "Jl. Karangtempel Raya No.12, Semarang Barat",
    hours: "10:00 - 22:00",
    phone: "0821-4567-8901",
    instagram: "@dharmaboutique",
    menus: [
      { id: 9, name: "Pour Over", description: "Manual brew dengan pilihan single origin", price: 45000, category: "Kopi", isRecommended: true },
      { id: 10, name: "Espresso Single Origin", description: "Espresso dari biji pilihan", price: 35000, category: "Kopi", isRecommended: false },
      { id: 11, name: "Cafe Latte", description: "Latte dengan roasted beans signature", price: 40000, category: "Kopi", isRecommended: false },
      { id: 12, name: "Cold Brew", description: "Cold brew 12 jam ekstraksi lambat", price: 42000, category: "Kopi", isRecommended: true },
      { id: 13, name: "Batch Brew", description: "Brew harian, ganti setiap minggu", price: 35000, category: "Kopi", isRecommended: false },
      { id: 14, name: "Cheesecake", description: "New York cheesecake homemade", price: 35000, category: "Makanan", isRecommended: false },
    ],
  },
  {
    id: 3,
    name: "Headroom Coffee",
    rating: 4.5,
    reviewCount: 98,
    priceRange: "Rp25-50rb",
    area: "Kota Lama",
    description:
      "Tempat nongkrong 24 jam yang hits banget. Tersembunyi di dalam Kotta Hotel Semarang, kawasan Kota Lama. Vibenya cocok buat anak muda gaul dengan desain artsy dan estetik.",
    address: "Kotta Hotel Semarang, Jl. Letjen Suprapto No.29, Kota Lama",
    hours: "24 jam (setiap hari)",
    phone: "0812-3456-7890",
    instagram: "@headroomcoffee",
    menus: [
      { id: 15, name: "Signature Latte", description: "Latte khas Headroom dengan house blend", price: 35000, category: "Kopi", isRecommended: true },
      { id: 16, name: "Tarik (Teh Tarik)", description: "Teh tarik creamy khas Indonesia", price: 25000, category: "Non-Kopi", isRecommended: false },
      { id: 17, name: "French Fries", description: "Kentang goreng dengan saus pilihan", price: 28000, category: "Makanan", isRecommended: false },
      { id: 18, name: "Chicken Wings", description: "Sayap ayam goreng saus pedas manis", price: 38000, category: "Makanan", isRecommended: true },
    ],
  },
  {
    id: 4,
    name: "Anak Panah Kopi",
    rating: 4.7,
    reviewCount: 245,
    priceRange: "Rp25-50rb",
    area: "Simpang Lima",
    description:
      "Coffee shop dengan identitas industrial yang sangat kuat dan konsisten di setiap sudutnya. Area tribun yang estetik menjadi spot favorit pengunjung untuk berfoto atau sekadar duduk santai tanpa meja formal. Bangunan luas berlantai dua.",
    address: "Jl. Pandanaran No.25, Simpang Lima, Semarang",
    hours: "09:00 - 23:00",
    phone: "0857-8901-2345",
    instagram: "@anakpanahkopi",
    menus: [
      { id: 19, name: "Kopi Susu Kekinian", description: "Kopi susu gula aren mantap", price: 25000, category: "Kopi", isRecommended: true },
      { id: 20, name: "Americano", description: "American hitam pekat", price: 22000, category: "Kopi", isRecommended: false },
      { id: 21, name: "V60 Manual Brew", description: "Manual brew single origin", price: 35000, category: "Kopi", isRecommended: false },
      { id: 22, name: "Banana Smoothie", description: "Smoothie pisang segar", price: 28000, category: "Non-Kopi", isRecommended: false },
      { id: 23, name: "Nasi Goreng Tribun", description: "Nasi goreng spesial", price: 38000, category: "Makanan", isRecommended: true },
    ],
  },
  {
    id: 5,
    name: "Obsidian Specialty Coffee & Eatery",
    rating: 4.6,
    reviewCount: 156,
    priceRange: "Rp30-100rb",
    area: "Kota Lama",
    description:
      "Berada di kawasan bersejarah Kota Lama, kafe ini berhasil menggabungkan nuansa kontemporer dengan elemen industrial yang elegan. Suasananya estetik dan memberikan kesan mewah namun tetap ramah.",
    address: "Kawasan Kota Lama, Jl. Letjen Suprapto No.15, Semarang",
    hours: "08:00 - 22:00",
    phone: "0822-5678-9012",
    instagram: "@obsidiansmg",
    menus: [
      { id: 24, name: "Espresso", description: "Espresso signature blend", price: 30000, category: "Kopi", isRecommended: false },
      { id: 25, name: "Cafe Latte", description: "Latte dengan latte art", price: 40000, category: "Kopi", isRecommended: true },
      { id: 26, name: "Moccacino", description: "Coklat campur kopi creamy", price: 45000, category: "Kopi", isRecommended: false },
      { id: 27, name: "Steak Ayam", description: "Ayam steak dengan saus blackpepper", price: 85000, category: "Makanan", isRecommended: true },
      { id: 28, name: "Pasta Aglio Olio", description: "Pasta dengan bawang putih dan minyak zaitun", price: 65000, category: "Makanan", isRecommended: false },
      { id: 29, name: "Red Velvet", description: "Red velvet latte", price: 45000, category: "Non-Kopi", isRecommended: false },
    ],
  },
  {
    id: 6,
    name: "Jaggad Coffee & Co",
    rating: 4.5,
    reviewCount: 203,
    priceRange: "Rp20-45rb",
    area: "Pusat Kota",
    description:
      "Primadona di pusat kota dengan tiga lantai yang masing-masing memiliki karakter berbeda. Area rooftop-nya menawarkan pemandangan kota Semarang yang sangat berkesan. Hidup namun tetap santai, jadi titik kumpul favorit berbagai komunitas.",
    address: "Jl. Pemuda No.88, Sekayu, Semarang Tengah",
    hours: "10:00 - 01:00",
    phone: "0856-7890-1234",
    instagram: "@jaggadcoffee",
    menus: [
      { id: 30, name: "Kopi Susu Jaggad", description: "Kopi susu signature Jaggad", price: 25000, category: "Kopi", isRecommended: true },
      { id: 31, name: "Vanilla Latte", description: "Latte dengan vanilla syrup", price: 30000, category: "Kopi", isRecommended: false },
      { id: 32, name: "Matcha Cream", description: "Matcha dengan cream toping", price: 32000, category: "Non-Kopi", isRecommended: false },
      { id: 33, name: "Chicken Katsu", description: "Ayam katsu dengan nasi dan salad", price: 40000, category: "Makanan", isRecommended: true },
    ],
  },
  {
    id: 7,
    name: "Paperplane Project",
    rating: 4.4,
    reviewCount: 132,
    priceRange: "Rp10-35rb",
    area: "Gajah Mungkur",
    description:
      "Kedai kopi dengan interior hangat bernuansa kayu dan pencahayaan temaram. Bukaan kaca lebar memungkinkan cahaya matahari masuk di pagi hari. Tempat yang pas buat memulai hari dengan secangkir kopi.",
    address: "Jl. Gajah Mungkur No.45, Gajah Mungkur, Semarang",
    hours: "09:00 - 23:00",
    phone: "0845-6789-0123",
    instagram: "@paperplaneproject",
    menus: [
      { id: 34, name: "Espresso", description: "Single shot espresso", price: 15000, category: "Kopi", isRecommended: false },
      { id: 35, name: "Cappuccino", description: "Cappuccino klasik", price: 20000, category: "Kopi", isRecommended: false },
      { id: 36, name: "Kopi Susu Gula Aren", description: "Kopi susu dengan gula aren asli", price: 22000, category: "Kopi", isRecommended: true },
      { id: 37, name: "Ice Tea", description: "Teh manis segar", price: 10000, category: "Non-Kopi", isRecommended: false },
      { id: 38, name: "Mendoan", description: "Tempe mendoan crispy", price: 12000, category: "Makanan", isRecommended: true },
      { id: 39, name: "Croissant", description: "Croissant buttery homemade", price: 18000, category: "Makanan", isRecommended: false },
    ],
  },
]
