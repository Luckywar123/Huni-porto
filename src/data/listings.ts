export type Kind = "kos" | "kontrakan";
export type Gender = "putra" | "putri" | "campur" | "keluarga";

export type Listing = {
  id: string;
  kind: Kind;
  gender: Gender;
  name: string;
  city: string;
  area: string;
  price: number;
  size: string;
  roomsAvailable: number;
  roomsTotal: number;
  minStay: string;
  furnished: string;
  blurb: string;
  description: string;
  facilities: string[];
  rules: string[];
  near: string[];
  image: string;
  gallery: string[];
};

export const listings: Listing[] = [
  {
    id: "melati",
    kind: "kos",
    gender: "putri",
    name: "Kos Melati",
    city: "Cianjur",
    area: "Sawah Gede",
    price: 850_000,
    size: "3 × 3 m",
    roomsAvailable: 4,
    roomsTotal: 12,
    minStay: "1 bulan",
    furnished: "Kasur, lemari, meja",
    blurb: "Kamar mandi dalam, sepuluh menit ke alun-alun.",
    description:
      "Kos putri dua lantai di gang yang tenang. Tiap kamar ada jendela, lemari, dan meja belajar. Dapur bersama di lantai dasar, parkir motor di dalam pagar. Cocok untuk pegawai kantor kecamatan dan mahasiswi pindahan.",
    facilities: ["Kamar mandi dalam", "Wi-Fi", "Lemari", "Meja belajar", "Dapur bersama", "Parkir motor"],
    rules: [
      "Tamu lawan jenis diterima sampai pukul 21.00 di ruang tamu",
      "Tidak memasak di dalam kamar",
      "Jam malam gerbang pukul 23.00",
    ],
    near: ["Alun-alun Cianjur · 1,2 km", "Pasar Muka · 1,5 km", "RSUD Sayang · 2 km"],
    image: "/media/room-sage.jpg",
    gallery: ["/media/room-sage.jpg", "/media/bath.jpg", "/media/kitchen.jpg", "/media/ext.jpg"],
  },
  {
    id: "sawah-lega",
    kind: "kos",
    gender: "putra",
    name: "Kos Sawah Lega",
    city: "Cianjur",
    area: "Sawah Lega",
    price: 650_000,
    size: "3 × 2,5 m",
    roomsAvailable: 6,
    roomsTotal: 18,
    minStay: "1 bulan",
    furnished: "Kasur dan kipas",
    blurb: "Harga masuk, kamar mandi luar, Wi-Fi area.",
    description:
      "Kos putra untuk pekerja pabrik dan anak kuliah yang butuh harga tetap. Kamar mandi bersama di tiap lantai, dapur boleh dipakai sampai pukul 22.00. Listrik kamar ditanggung penghuni lewat token per meter.",
    facilities: ["Kamar mandi luar", "Kipas", "Wi-Fi area", "Dapur bersama", "Parkir motor", "Penjaga malam"],
    rules: ["Tidak membawa tamu menginap", "Rokok hanya di teras", "Sampah dibuang sebelum pukul 07.00"],
    near: ["Terminal Cianjur · 2 km", "Pasar Sawah Lega · 400 m"],
    image: "/media/room-night.jpg",
    gallery: ["/media/room-night.jpg", "/media/kitchen.jpg", "/media/ext.jpg"],
  },
  {
    id: "bojong",
    kind: "kontrakan",
    gender: "keluarga",
    name: "Kontrakan Griya Bojong",
    city: "Cianjur",
    area: "Bojongherang",
    price: 2_400_000,
    size: "2 kamar · 45 m²",
    roomsAvailable: 1,
    roomsTotal: 2,
    minStay: "1 tahun",
    furnished: "Sebagian — sofa dan kompor",
    blurb: "Rumah satu lantai, teras, dekat sawah dan sekolah.",
    description:
      "Kontrakan untuk keluarga kecil. Dua kamar tidur, ruang tamu, dapur, dan kamar mandi. Listrik token, air sumur bor. Satu unit masih kosong dan bisa dilihat di akhir pekan.",
    facilities: ["Dapur", "Ruang tamu", "Kamar mandi dalam", "Teras", "Parkir motor", "Air sumur"],
    rules: ["Tidak untuk kos-kosan ulang", "Hewan peliharaan atas izin", "Kontrak minimal satu tahun"],
    near: ["SD Bojongherang · 600 m", "Puskesmas · 1 km"],
    image: "/media/hills.jpg",
    gallery: ["/media/hills.jpg", "/media/living.jpg", "/media/kitchen.jpg"],
  },
  {
    id: "dago",
    kind: "kos",
    gender: "putri",
    name: "Kos Dago Atas",
    city: "Bandung",
    area: "Dago",
    price: 2_100_000,
    size: "3 × 4 m",
    roomsAvailable: 2,
    roomsTotal: 8,
    minStay: "3 bulan",
    furnished: "Lengkap, termasuk AC",
    blurb: "Kamar lebih luas, water heater, laundry mingguan.",
    description:
      "Delapan kamar di rumah tinggal yang disewakan khusus putri. AC, kamar mandi dalam, dan water heater. Laundry sprei seminggu sekali sudah masuk sewa. Jalan menanjak; motor lebih praktis daripada mobil.",
    facilities: ["AC", "Kamar mandi dalam", "Water heater", "Wi-Fi", "Laundry mingguan", "Parkir motor"],
    rules: ["Kapasitas satu orang", "Tidak boleh pindah perabot", "Tamu hanya di lantai dasar"],
    near: ["Dago · 8 menit motor", "Kampus utara · 15 menit"],
    image: "/media/room-bandung.jpg",
    gallery: ["/media/room-bandung.jpg", "/media/bath.jpg", "/media/kitchen.jpg"],
  },
  {
    id: "margonda",
    kind: "kos",
    gender: "putra",
    name: "Kos Margonda",
    city: "Depok",
    area: "Margonda",
    price: 1_100_000,
    size: "3 × 3 m",
    roomsAvailable: 3,
    roomsTotal: 10,
    minStay: "1 bulan",
    furnished: "Kasur, meja, lemari",
    blurb: "Jalan kaki ke Margonda, cocok anak kuliah.",
    description:
      "Kos putra di gang belakang jalan Margonda. Kamar mandi dalam, meja belajar menghadap jendela. Sepeda motor parkir bergiliran karena lahan sempit. Banyak warung di mulut gang.",
    facilities: ["Kamar mandi dalam", "Meja belajar", "Wi-Fi", "Lemari", "Dapur bersama"],
    rules: ["Tidak membawa alat masak listrik di kamar", "Tamu pulang sebelum pukul 22.00"],
    near: ["Jalan Margonda · 6 menit jalan kaki", "Stasiun Pondok Cina · 1,5 km"],
    image: "/media/room-rust.jpg",
    gallery: ["/media/room-rust.jpg", "/media/bath.jpg", "/media/kitchen.jpg"],
  },
  {
    id: "cilodong",
    kind: "kontrakan",
    gender: "keluarga",
    name: "Kontrakan Cilodong",
    city: "Depok",
    area: "Cilodong",
    price: 3_200_000,
    size: "3 kamar · 72 m²",
    roomsAvailable: 1,
    roomsTotal: 1,
    minStay: "1 tahun",
    furnished: "Kosong — siap diisi sendiri",
    blurb: "Ruko-rumah dua lantai dengan carport.",
    description:
      "Kontrakan dua lantai untuk keluarga. Tiga kamar tidur, dua kamar mandi, carport satu mobil. Unit diserahkan kosong dan bersih. Cocok pegawai yang pindah tugas dan butuh kontrak tahunan yang jelas.",
    facilities: ["Carport", "2 kamar mandi", "Dapur", "Listrik token", "Air PDAM"],
    rules: ["Tidak disewakan kembali per kamar", "Uang muka dua bulan di luar sewa pertama"],
    near: ["Stasiun Citayam · 3 km", "Pasar Cilodong · 1 km"],
    image: "/media/townhouse.jpg",
    gallery: ["/media/townhouse.jpg", "/media/living.jpg", "/media/kitchen.jpg"],
  },
];

export const cities = ["Cianjur", "Bandung", "Depok"] as const;

export function listingById(id: string) {
  return listings.find((item) => item.id === id);
}

export function rupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function rupiahShort(value: number) {
  if (value >= 1_000_000) {
    const juta = value / 1_000_000;
    const text = Number.isInteger(juta) ? String(juta) : juta.toFixed(1).replace(".", ",");
    return `Rp${text} jt`;
  }
  return `Rp${Math.round(value / 1000)} rb`;
}

export function kindLabel(kind: Kind) {
  return kind === "kos" ? "Kos" : "Kontrakan";
}

export function genderLabel(gender: Gender) {
  if (gender === "putra") return "Putra";
  if (gender === "putri") return "Putri";
  if (gender === "campur") return "Campur";
  return "Keluarga";
}
