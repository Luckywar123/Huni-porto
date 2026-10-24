// Data contoh dashboard HUNI. Semua angka ilustrasi, belum terhubung ke POS.
export type Batch = { id: string; item: string; date: string; qty: number; cost: number };
export type Role = "admin" | "kasir" | "gudang" | "marketing" | "chef" | "kos";
export type Tab = "ringkasan" | "pembayaran" | "penjualan" | "gudang" | "marketing" | "rnd";

export const ROLES: Record<Role, { label: string; tabs: Tab[] }> = {
  admin: { label: "Admin / owner", tabs: ["ringkasan", "pembayaran", "penjualan", "gudang", "marketing", "rnd"] },
  kasir: { label: "Kasir", tabs: ["penjualan", "pembayaran"] },
  gudang: { label: "Gudang", tabs: ["gudang"] },
  marketing: { label: "Marketing", tabs: ["marketing"] },
  chef: { label: "Chef R&D", tabs: ["rnd", "gudang"] },
  kos: { label: "Pengelola kos", tabs: ["ringkasan", "pembayaran"] },
};
export const TAB_LABEL: Record<Tab, string> = { ringkasan: "Ringkasan", pembayaran: "Pembayaran", penjualan: "Penjualan", gudang: "Gudang", marketing: "Marketing", rnd: "R&D menu" };

export const UNITS: Record<string, string> = { kopi: "g", susu: "ml", "gula aren": "ml", ayam: "g", beras: "g", cabai: "g" };

export const seedBatches: Batch[] = [
  { id: "b1", item: "kopi", date: "2026-10-05", qty: 2000, cost: 280 },
  { id: "b2", item: "kopi", date: "2026-10-19", qty: 3000, cost: 300 },
  { id: "b3", item: "susu", date: "2026-10-12", qty: 20000, cost: 18 },
  { id: "b4", item: "susu", date: "2026-10-20", qty: 20000, cost: 19 },
  { id: "b5", item: "gula aren", date: "2026-10-10", qty: 5000, cost: 40 },
  { id: "b6", item: "ayam", date: "2026-10-18", qty: 6000, cost: 45 },
  { id: "b7", item: "ayam", date: "2026-10-22", qty: 8000, cost: 48 },
  { id: "b8", item: "beras", date: "2026-10-01", qty: 30000, cost: 15 },
  { id: "b9", item: "cabai", date: "2026-10-18", qty: 2000, cost: 60 },
];

export const MENUS = [
  { id: "ksa", name: "Kopi Susu Aren", price: 22_000, recipe: { kopi: 18, susu: 150, "gula aren": 20 } },
  { id: "ame", name: "Americano", price: 18_000, recipe: { kopi: 18 } },
  { id: "geprek", name: "Ayam Geprek + Nasi", price: 28_000, recipe: { ayam: 120, beras: 150, cabai: 15 } },
] as const;
export const HPP_TARGET = 0.35;

const byDate = (a: Batch, b: Batch) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id);

// FIFO: ambil dari batch tertua dulu, HPP dihitung dari harga batch yang benar-benar terpakai.
export function consumeFifo(batches: Batch[], item: string, need: number) {
  const next = batches.map((b) => ({ ...b }));
  let left = need;
  let cost = 0;
  for (const b of next.filter((x) => x.item === item).sort(byDate)) {
    if (left <= 0) break;
    const take = Math.min(b.qty, left);
    b.qty -= take;
    left -= take;
    cost += take * b.cost;
  }
  return { next, cost, short: left };
}

export const stockOf = (batches: Batch[], item: string) => batches.filter((b) => b.item === item).reduce((s, b) => s + b.qty, 0);

// HPP satu porsi dengan harga batch tertua yang masih ada (tanpa memotong stok).
export function menuCost(batches: Batch[], recipe: Record<string, number>) {
  return Object.entries(recipe).reduce((sum, [item, qty]) => sum + consumeFifo(batches, item, qty).cost, 0);
}

export const KOLS = [
  { name: "KOL Kuliner A", platform: "IG · 85 rb", fee: 1_500_000, code: "HUNI-A", redeem: 120, omzet: 3_600_000, unit: "Cafe" },
  { name: "Influencer Futsal B", platform: "TikTok · 120 rb", fee: 2_000_000, code: "FUTSAL-B", redeem: 45, omzet: 5_400_000, unit: "Futsal" },
  { name: "Mikro-influencer Kos C", platform: "IG · 30 rb", fee: 800_000, code: "KOS-C", redeem: 3, omzet: 6_900_000, unit: "Kos" },
];

export const PAYMENTS = [
  { unit: "Unit 1", name: "Penghuni A", due: "1 Nov", amount: 2_800_000, method: "Transfer", status: "Lunas" },
  { unit: "Unit 2", name: "Penghuni B", due: "1 Nov", amount: 2_300_000, method: "QRIS", status: "Lunas" },
  { unit: "Unit 5", name: "Penghuni C", due: "1 Nov", amount: 2_300_000, method: "Tunai", status: "Belum" },
  { unit: "Unit 9", name: "Penghuni D", due: "25 Okt", amount: 2_300_000, method: "Transfer", status: "Telat" },
  { unit: "Unit 15", name: "Penghuni E", due: "1 Nov", amount: 2_000_000, method: "QRIS", status: "Lunas" },
  { unit: "Unit 18", name: "Penghuni F", due: "1 Nov", amount: 2_000_000, method: "Transfer", status: "Belum" },
];

export const MONTHLY = [
  { bulan: "Mei", hunian: 75, cafe: 58, kos: 33.3 },
  { bulan: "Jun", hunian: 83, cafe: 62, kos: 36.9 },
  { bulan: "Jul", hunian: 67, cafe: 65, kos: 29.7 },
  { bulan: "Agu", hunian: 83, cafe: 67, kos: 36.9 },
  { bulan: "Sep", hunian: 92, cafe: 69, kos: 40.8 },
  { bulan: "Okt", hunian: 75, cafe: 70, kos: 33.3 },
];
