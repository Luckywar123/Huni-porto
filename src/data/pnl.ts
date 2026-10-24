// Angka dari Cafe_Futsall_Kosan.xlsx (public/pitch). Ganti input di sini, tabel PNL ikut berubah.

// Kos: 20 unit, potensi penuh. Biaya = 15% System & Marketing + 15% Perawatan & operasional.
const kosPotential = 2_800_000 + 12 * 2_300_000 + 7 * 2_000_000;
const kosOps = kosPotential * (0.15 + 0.15);

// Cafe, skenario Target. Operasional = biaya pemilik (bahan 35%, packaging 3%, listrik, air, gas, internet, kebersihan, sewa).
const cafeOmzet = 80 * 33_333 * 30;
const cafeOps = cafeOmzet * (0.35 + 0.03) + (2_500_000 + 400_000 + 500_000 + 400_000 + 300_000 + 0);

// Futsal, skenario Realistis: 2 lapangan x 5 jam x 28 hari x Rp120.000 + event Rp3 jt. Operasional = bagian pengelola 30%.
const futsalRevenue = 2 * 5 * 28 * 120_000 + 3_000_000;
const futsalOps = futsalRevenue * 0.3;

export const pnlRows = [
  { name: "Cafe", gross: cafeOmzet, ops: cafeOps, basis: "Omzet target 80 pelanggan x Rp33.333 x 30 hari. Operasional: bahan baku, packaging, listrik, air, gas, internet, kebersihan." },
  { name: "Kosan / kontrakan", gross: kosPotential, ops: kosOps, basis: "Potensi penuh 20 unit. Operasional: 15% System & Marketing + 15% Perawatan & operasional." },
  { name: "Futsal", gross: futsalRevenue, ops: futsalOps, basis: "Skenario realistis, 2 lapangan, 5 jam per hari. Operasional: bagian pengelola 30%." },
];

export const pnlGross = pnlRows.reduce((sum, r) => sum + r.gross, 0);
export const pnlOps = pnlRows.reduce((sum, r) => sum + r.ops, 0);
export const pnlOwner = pnlGross - pnlOps;
