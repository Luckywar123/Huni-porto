import PptxGenJS from "pptxgenjs";
import { mkdir } from "node:fs/promises";

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "HUNI", width: 13.333, height: 7.5 });
pptx.layout = "HUNI";
pptx.author = "HUNI";
pptx.title = "HUNI — Proposal website kos dan kontrakan";
pptx.subject = "Desain, proof of concept, model bagi hasil";

const ink = "1A1814";
const paper = "F4EFE6";
const card = "FBF8F3";
const clay = "C4622D";
const clayDeep = "9A4518";
const moss = "2F5D50";
const sand = "E7DCC8";
const line = "D9CFBF";
const muted = "6F675C";
const soft = "3F382F";
const TOTAL = 26;
const deck = "/home/claude/ws/artifacts/deck";

function light(slide) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: paper } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.1, h: 7.5, fill: { color: clay } });
}

function foot(slide, n) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 7.22, w: 13.333, h: 0.28, fill: { color: ink } });
  slide.addText("HUNI   ·   Proposal website kos & kontrakan   ·   Oktober 2026", {
    x: 0.38,
    y: 7.22,
    w: 10,
    h: 0.28,
    fontFace: "Calibri",
    fontSize: 11,
    color: sand,
    margin: 0,
    valign: "middle",
  });
  slide.addText(String(n).padStart(2, "0") + "  /  " + String(TOTAL).padStart(2, "0"), {
    x: 10.4,
    y: 7.22,
    w: 2.55,
    h: 0.28,
    fontFace: "Calibri",
    fontSize: 11,
    color: sand,
    align: "right",
    margin: 0,
    valign: "middle",
  });
}

function h1(slide, text, y = 0.28) {
  slide.addText(text, {
    x: 0.42,
    y,
    w: 12.4,
    h: 0.5,
    fontFace: "Georgia",
    fontSize: 28,
    color: ink,
    margin: 0,
  });
}

function box(slide, x, y, w, h, fill = card) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: fill === card ? line : fill, width: 1 },
    rectRadius: 0.08,
  });
}

function kicker(slide, text, x, y, w, color = clayDeep) {
  slide.addText(text, {
    x,
    y,
    w,
    h: 0.26,
    fontFace: "Calibri",
    fontSize: 12,
    bold: true,
    color,
    margin: 0,
  });
}

// 1 Cover
{
  const s = pptx.addSlide();
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: ink } });
  s.addImage({
    path: "/home/claude/ws/public/media/ext.jpg",
    x: 8.15,
    y: 0,
    w: 5.183,
    h: 7.5,
    sizing: { type: "cover", x: 0, y: 0, w: 5.183, h: 7.5 },
  });
  s.addShape(pptx.ShapeType.rect, { x: 0.48, y: 0.48, w: 0.7, h: 0.08, fill: { color: clay } });
  s.addText("HUNI", {
    x: 0.48,
    y: 1.5,
    w: 7.2,
    h: 1.15,
    fontFace: "Georgia",
    fontSize: 80,
    color: paper,
    margin: 0,
  });
  s.addText("Website kos dan kontrakan,\nend to end.", {
    x: 0.48,
    y: 2.8,
    w: 7.2,
    h: 1.35,
    fontFace: "Georgia",
    fontSize: 28,
    color: sand,
    margin: 0,
  });
  s.addText(
    "Proposal untuk pemilik yang mau punya situs sendiri:\ndesain, proof of concept, dan model bagi hasil.",
    {
      x: 0.48,
      y: 4.45,
      w: 7,
      h: 0.8,
      fontFace: "Calibri",
      fontSize: 16,
      color: "C8BBA8",
      margin: 0,
    },
  );
  s.addText("Oktober 2026   ·   Penawaran ilustrasi, belum mengikat", {
    x: 0.48,
    y: 6.55,
    w: 7,
    h: 0.32,
    fontFace: "Calibri",
    fontSize: 13,
    color: clay,
    margin: 0,
  });
  s.addNotes("Buka dengan demo hidup, baru masuk ke harga. Jangan mulai dari angka.");
}

// 2 Masalah
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 2);
  h1(s, "Kamar kosong sunyi. Chat-nya tidak.");
  s.addText("Empat kebiasaan yang bikin unit sulit disewakan tanpa menambah kamar.", {
    x: 0.42,
    y: 0.86,
    w: 12,
    h: 0.34,
    fontFace: "Calibri",
    fontSize: 15,
    color: muted,
    margin: 0,
  });
  const items = [
    ["01   Grup chat", "Foto tenggelam besoknya.", "Harga di caption sering beda dengan harga yang diucap pengelola. Calon penyewa harus bertanya ulang."],
    ["02   Marketplace umum", "Iklan, bukan operasional.", "Unit tercampur dengan rumah dijual. Status kamar hari ini tidak ada. Begitu tersewa, iklannya tetap nongol."],
    ["03   Calo", "Satu bulan sewa per orang.", "Enam penempatan setahun pada kamar Rp1,2 juta berarti sekitar Rp7,2 juta yang tidak masuk ke pemilik."],
    ["04   Catatan di kepala", "Pengganti tidak bisa nerusin.", "Kamar mana yang booking, mana yang sudah bayar, ada di ingatan satu orang. Cuti sehari, jawabannya macet."],
  ];
  items.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.42 + col * 6.4;
    const y = 1.4 + row * 2.75;
    box(s, x, y, 6.15, 2.55);
    s.addText(item[0], { x: x + 0.28, y: y + 0.22, w: 5.6, h: 0.36, fontFace: "Georgia", fontSize: 20, color: ink, margin: 0 });
    s.addText(item[1], { x: x + 0.28, y: y + 0.68, w: 5.6, h: 0.32, fontFace: "Calibri", fontSize: 14, bold: true, color: clayDeep, margin: 0 });
    s.addText(item[2], { x: x + 0.28, y: y + 1.1, w: 5.6, h: 1.15, fontFace: "Calibri", fontSize: 15, color: soft, margin: 0 });
  });
}

// 3 Solusi
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 3);
  h1(s, "Satu situs. Dua sisi. Tidak lewat calo dulu.");
  s.addText("HUNI diposisikan sebagai website milik pengelola, bukan aplikasi nasional yang merebut merek kos Anda.", {
    x: 0.42,
    y: 0.88,
    w: 12.2,
    h: 0.36,
    fontFace: "Calibri",
    fontSize: 15,
    color: muted,
    margin: 0,
  });
  const steps = [
    ["01", "Pasang", "Foto, harga, fasilitas, dan aturan ditulis sekali. Tidak hilang di riwayat chat."],
    ["02", "Saring", "Calon penyewa pilih kota, jenis, dan batas harga sebelum bertanya."],
    ["03", "Ajukan", "Nama, nomor, tanggal masuk, dan catatan masuk ke satu daftar."],
    ["04", "Catat", "Kamar ditandai isi, kosong, atau booking. Pengganti bisa membacanya."],
  ];
  steps.forEach((step, i) => {
    const x = 0.42 + i * 3.2;
    box(s, x, 1.5, 3.02, 3.15);
    s.addText(step[0], { x: x + 0.2, y: 1.7, w: 2.6, h: 0.4, fontFace: "Georgia", fontSize: 22, color: clay, margin: 0 });
    s.addText(step[1], { x: x + 0.2, y: 2.2, w: 2.6, h: 0.42, fontFace: "Georgia", fontSize: 22, color: ink, margin: 0 });
    s.addText(step[2], { x: x + 0.2, y: 2.75, w: 2.6, h: 1.6, fontFace: "Calibri", fontSize: 14, color: soft, margin: 0 });
  });
  box(s, 0.42, 4.85, 12.48, 2.1, moss);
  s.addText("Kos dan kontrakan di halaman yang sama", {
    x: 0.7,
    y: 5.08,
    w: 11.8,
    h: 0.4,
    fontFace: "Georgia",
    fontSize: 20,
    color: paper,
    margin: 0,
  });
  s.addText(
    "Kos disewa per kamar, biasanya bulanan. Kontrakan disewa per rumah, biasanya minimal setahun. Keduanya butuh foto yang jujur, harga yang satu, dan status kosong yang tidak bohong. Demo memakai contoh di Cianjur, Bandung, dan Depok.",
    {
      x: 0.7,
      y: 5.55,
      w: 11.8,
      h: 1.1,
      fontFace: "Calibri",
      fontSize: 15,
      color: sand,
      margin: 0,
    },
  );
}

// 4 Fitur
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 4);
  h1(s, "Apa yang dilihat penyewa, apa yang dipegang pemilik.");
  box(s, 0.42, 1.15, 6.15, 5.75);
  box(s, 6.77, 1.15, 6.15, 5.75, ink);
  s.addText("Calon penghuni", { x: 0.7, y: 1.4, w: 5.6, h: 0.4, fontFace: "Georgia", fontSize: 24, color: ink, margin: 0 });
  const left = [
    "Beranda dengan cari nama dan kota",
    "Katalog: kos atau kontrakan, batas harga",
    "Halaman unit: galeri, ukuran, aturan, sekitar",
    "Simpan unit untuk dibandingkan",
    "Form ajukan sewa, dengan cek nomor HP",
  ];
  left.forEach((lineText, i) => {
    s.addText(lineText, {
      x: 0.7,
      y: 2.1 + i * 0.8,
      w: 5.5,
      h: 0.65,
      fontFace: "Calibri",
      fontSize: 16,
      color: soft,
      margin: 0,
    });
  });
  s.addText("Pemilik & pengelola", {
    x: 7.05,
    y: 1.4,
    w: 5.6,
    h: 0.4,
    fontFace: "Georgia",
    fontSize: 24,
    color: paper,
    margin: 0,
  });
  const right = [
    "Papan kamar: ketuk untuk ganti status",
    "Hitungan isi, booking, dan kosong",
    "Daftar pengajuan beserta tanggal masuk",
    "Grafik hunian beberapa bulan",
    "Tahap lanjut: DP, invoice, laporan uang",
  ];
  right.forEach((lineText, i) => {
    s.addText(lineText, {
      x: 7.05,
      y: 2.1 + i * 0.8,
      w: 5.5,
      h: 0.65,
      fontFace: "Calibri",
      fontSize: 16,
      color: sand,
      margin: 0,
    });
  });
}

function mockSlide(n, title, lede, image, points) {
  const s = pptx.addSlide();
  light(s);
  foot(s, n);
  h1(s, title);
  s.addImage({
    path: `${deck}/${image}`,
    x: 0.38,
    y: 1.05,
    w: 8.15,
    h: 5.09,
  });
  points.forEach((point, i) => {
    s.addText(point[0], {
      x: 8.75,
      y: 1.15 + i * 1.15,
      w: 4.2,
      h: 0.32,
      fontFace: "Georgia",
      fontSize: 16,
      color: ink,
      margin: 0,
    });
    s.addText(point[1], {
      x: 8.75,
      y: 1.48 + i * 1.15,
      w: 4.2,
      h: 0.7,
      fontFace: "Calibri",
      fontSize: 13,
      color: soft,
      margin: 0,
    });
  });
  s.addNotes(lede);
}

mockSlide(5, "Beranda", "Tunjukkan hero dan cari.", "home.png", [
  ["Langsung cari", "Nama kos atau kota, tanpa harus daftar dulu."],
  ["Foto sungguhan", "Bukan kotak abu-abu. Penyewa menilai dari gambar."],
  ["Dua produk", "Kos per kamar dan kontrakan per rumah, satu merek."],
  ["Jujur ini demo", "Pita di atas menulis bahwa datanya contoh."],
]);

mockSlide(6, "Katalog", "Filter jalan di peramban.", "cari.png", [
  ["Filter yang dipakai", "Kata, jenis, kota, dan batas harga."],
  ["Status kosong", "Berapa unit yang masih ada, ditulis di kartu."],
  ["Harga sebulan", "Kontrakan pun ditampilkan per bulan agar bisa dibanding."],
  ["Tersimpan", "Tombol untuk melihat hanya unit yang disimpan."],
]);

mockSlide(7, "Halaman unit", "Form sudah diuji.", "unit.png", [
  ["Galeri", "Beberapa foto, bukan satu gambar dipaksakan."],
  ["Aturan di depan", "Jam tamu dan larangan masak tidak disembunyikan."],
  ["Ajukan sewa", "Nama, HP, tanggal masuk. Nomor dicek formatnya."],
  ["Tersimpan di perangkat", "Di demo, data belum dikirim ke server."],
]);

mockSlide(8, "Papan pemilik", "Pengajuan dari form muncul di sini.", "pemilik-inquiry.png", [
  ["12 kamar contoh", "Ketuk kartu: isi, kosong, lalu booking."],
  ["Pengajuan masuk", "Termasuk yang baru dikirim dari halaman unit."],
  ["Grafik hunian", "Mei–Oktober. Angka contoh, bukan hitungan live."],
  ["Kos Melati", "Satu properti dulu. Multi-properti ditambah di tahap lanjut."],
]);

// 9 Mobile
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 9);
  h1(s, "Dipakai dari HP, karena yang cari kos jarang buka laptop.");
  const h = 5.15;
  const w = h * (390 / 844);
  const gap = 0.45;
  const x0 = (13.333 - w * 2 - gap) / 2;
  s.addImage({ path: `${deck}/home-mobile.png`, x: x0, y: 1.15, w, h });
  s.addImage({ path: `${deck}/unit-mobile.png`, x: x0 + w + gap, y: 1.15, w, h });
  s.addText("Beranda", {
    x: x0,
    y: 6.4,
    w,
    h: 0.3,
    align: "center",
    fontFace: "Calibri",
    fontSize: 13,
    color: muted,
    margin: 0,
  });
  s.addText("Detail kontrakan", {
    x: x0 + w + gap,
    y: 6.4,
    w,
    h: 0.3,
    align: "center",
    fontFace: "Calibri",
    fontSize: 13,
    color: muted,
    margin: 0,
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 0.42,
    y: 6.78,
    w: 12.5,
    h: 0.32,
    fill: { color: paper },
  });
  s.addText("Tombol dan bidang isian cukup besar untuk ibu jari. Tidak ada geser kiri-kanan.", {
    x: 0.42,
    y: 6.75,
    w: 12.5,
    h: 0.32,
    fontFace: "Calibri",
    fontSize: 13,
    color: muted,
    margin: 0,
  });
}

// 10 PoC
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 10);
  h1(s, "Proof of concept: yang sudah bisa diklik.");
  s.addText("Ini bukti arah produk, bukan sistem produksi. Data contoh, tanpa akun.", {
    x: 0.42,
    y: 0.88,
    w: 12,
    h: 0.32,
    fontFace: "Calibri",
    fontSize: 15,
    color: muted,
    margin: 0,
  });
  box(s, 0.42, 1.4, 6.15, 5.5, moss);
  box(s, 6.77, 1.4, 6.15, 5.5);
  s.addText("Sudah jalan", { x: 0.7, y: 1.62, w: 5.6, h: 0.4, fontFace: "Georgia", fontSize: 22, color: paper, margin: 0 });
  const done = [
    "Enam unit contoh: kos dan kontrakan",
    "Filter kota, jenis, harga, dan kata",
    "Galeri, fasilitas, aturan, kawasan sekitar",
    "Simpan unit di peramban",
    "Form sewa dengan validasi nomor",
    "Papan 12 kamar bisa diubah statusnya",
    "Pengajuan form muncul di papan",
    "Grafik hunian contoh",
    "Halaman model kerja sama yang sama dengan deck ini",
  ];
  done.forEach((lineText, i) => {
    s.addText(lineText, {
      x: 0.7,
      y: 2.15 + i * 0.48,
      w: 5.55,
      h: 0.42,
      fontFace: "Calibri",
      fontSize: 14,
      color: sand,
      margin: 0,
    });
  });
  s.addText("Menyusul di produksi", {
    x: 7.05,
    y: 1.62,
    w: 5.6,
    h: 0.4,
    fontFace: "Georgia",
    fontSize: 22,
    color: ink,
    margin: 0,
  });
  const later = [
    "Data di server pemilik, bukan di HP pengunjung",
    "Akun pemilik dan pengelola",
    "WhatsApp atau email sungguhan saat ada pengajuan",
    "Pembayaran DP dan invoice (tahap lanjut)",
    "Kontrak yang bisa diunduh",
    "Foto dan harga dari properti klien",
    "Domain atas nama klien",
  ];
  later.forEach((lineText, i) => {
    s.addText(lineText, {
      x: 7.05,
      y: 2.2 + i * 0.55,
      w: 5.55,
      h: 0.48,
      fontFace: "Calibri",
      fontSize: 15,
      color: soft,
      margin: 0,
    });
  });
}

{
const K = 1.3333, F = 1.2, TOT = 26;
const S = ["Konservatif", "Realistis", "Optimis"];
const jt = (n) => (n / 1e6).toFixed(2).replace(".", ",") + " jt";
const rp = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");
let n = 11;
const base = () => { const s = pptx.addSlide(); light(s); foot(s, n++); return s; };
const T = (s, text, o) => s.addText(text, { ...o, x: o.x * K, y: o.y * K, w: o.w * K, h: o.h * K, fontSize: (o.fontSize || 12) * F, margin: 0, fontFace: o.fontFace || "Calibri" });
const head = (s, t, sub) => { T(s, t, { x: 0.35, y: 0.25, w: 9.3, h: 0.6, fontSize: 26, bold: true, color: ink, fontFace: "Georgia" }); if (sub) T(s, sub, { x: 0.35, y: 0.88, w: 9.3, h: 0.4, fontSize: 13, color: muted }); };
const table = (s, rows, colW, y, rowH = 0.4, boldRows = []) => {
  const hd = rows[0].map((c) => ({ text: c, options: { bold: true, color: paper, fill: { color: ink }, fontSize: 11 * F, align: "left" } }));
  const bd = rows.slice(1).map((r, ri) => r.map((c, ci) => ({ text: String(c), options: { fontSize: 11 * F, color: ink, bold: boldRows.includes(ri + 1) || ri === rows.length - 2, fill: { color: boldRows.includes(ri + 1) ? sand : ri % 2 ? card : paper }, align: ci && /^(Rp|\d|-)/.test(String(c)) && String(c).length < 18 ? "right" : "left" } })));
  s.addTable([hd, ...bd], { x: 0.35 * K, y: y * K, w: 9.3 * K, colW: colW.map((c) => c * K), rowH: rowH * K, border: { type: "solid", pt: 0.5, color: line }, margin: [2, 8, 2, 8] });
};
const box = (s, x, y, w, h, t, lines, fill) => {
  s.addShape(pptx.ShapeType.roundRect, { x: x * K, y: y * K, w: w * K, h: h * K, fill: { color: fill || card }, line: { color: line, width: 0.75 }, rectRadius: 0.08 });
  T(s, t, { x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.35, fontSize: 14, bold: true, color: fill ? paper : ink, fontFace: "Georgia" });
  s.addText(lines.map((l, i) => ({ text: l, options: { bullet: true, breakLine: i < lines.length - 1 } })), { x: (x + 0.15) * K, y: (y + 0.5) * K, w: (w - 0.3) * K, h: (h - 0.6) * K, fontSize: 11.5 * F, color: fill ? sand : soft, valign: "top", margin: 0, paraSpaceAfter: 4 });
};
const chart = (s, series, y, h, colors) => s.addChart(pptx.charts.BAR, series, { x: 0.35 * K, y: y * K, w: 9.3 * K, h: h * K, barDir: "bar", barGrouping: "stacked", chartColors: colors, showLegend: true, legendPos: "r", legendFontSize: 10, catAxisLabelFontSize: 10, valAxisLabelFontSize: 10, valGridLine: { color: line, size: 0.5 }, catGridLine: { style: "none" } });
const ser = (name, arr) => ({ name, labels: S, values: arr });

// ---- data (sama dengan Cafe_Futsall_Kosan.xlsx)
const kosTotal = 2.8e6 + 12 * 2.3e6 + 7 * 2.0e6, kosTarget = kosTotal * 0.8, kosSys = kosTarget * 0.15, kosOps = kosTarget * 0.15, kosNet = kosTarget - kosSys - kosOps;
const fut = [84, 112, 140].map((jam) => { const rev = jam * 120000; return { jam, rev, share: rev * 0.3, owner: rev * 0.7 }; });
const cafe = [[45, 30000], [70, 33000], [100, 35000]].map(([pax, sp]) => {
  const rev = pax * sp * 30, share = rev * 0.5, hpp = rev * 0.35, pack = rev * 0.03, fixed = 4.1e6, pay0 = 7.7e6, bpjs = pay0 * 0.1, pay = pay0 + bpjs, mkt = rev * 0.08, ev = rev * 0.05, mt = rev * 0.05;
  const ownerCost = hpp + pack + fixed, fee = share - (pay + mkt + ev + mt);
  return { pax, sp, rev, share, hpp, pack, fixed, pay, bpjs, mkt, ev, mt, ownerCost, fee, ownerNet: rev - share - ownerCost };
});

// 11 model
let s = base(); head(s, "Model kerja sama: bagi hasil, bukan paket harga", "Tidak ada pilihan paket. Pengelola dibayar dari persentase omzet.");
box(s, 0.35, 1.5, 3.0, 3.2, "Kos & kontrakan", ["30% dari pendapatan sewa", "15% System & Marketing", "15% Perawatan & operasional", "Build web diambil dari pos 15% System"]);
box(s, 3.5, 1.5, 3.0, 3.2, "Lapangan futsal", ["30% dari total revenue", "Maintenance 10%, event 8%", "Marketing 7%, fee pengelola 5%", "Booking lewat web HUNI"], moss);
box(s, 6.65, 1.5, 3.0, 3.2, "Cafe", ["50% dari omzet", "Gaji 3 karyawan, marketing, event, maintenance", "Sisa 50% untuk pemilik: bahan baku, listrik, dll", "Fee pengelola = sisa dari 50%"], clayDeep);
T(s, "Angka dasar: file Cafe_Futsall_Kosan.xlsx. Hunian kos 80%, futsal Rp120 rb x 112 jam.", { x: 0.35, y: 4.85, w: 9.3, h: 0.35, fontSize: 12, color: muted });

// 12 kosan income
s = base(); head(s, "Kos: potensi pendapatan", "20 unit contoh, hunian target 80%.");
table(s, [["Kelompok unit", "Jumlah", "Sewa / bulan", "Subtotal"], ["Unit 1", 1, "Rp2.800.000", rp(2.8e6)], ["Unit 2–13", 12, "Rp2.300.000", rp(27.6e6)], ["Unit 14–20", 7, "Rp2.000.000", rp(14e6)], ["Total jika penuh", 20, "", rp(kosTotal)], ["Target income (80%)", "", "", rp(kosTarget)]], [3.3, 1.5, 2.3, 2.2], 1.5, 0.45, [4]);

// 13 kosan biaya
s = base(); head(s, "Kos: biaya dan sisa pemilik per bulan", "30% dari target income menjadi bagian pengelola.");
table(s, [["Pos", "Porsi", "Per bulan"], ["Target income", "100%", rp(kosTarget)], ["System & Marketing (termasuk build web)", "15%", rp(kosSys)], ["Perawatan & operasional", "15%", rp(kosOps)], ["Total biaya", "30%", rp(kosSys + kosOps)], ["Net income owner", "70%", rp(kosNet)]], [5.3, 1.5, 2.5], 1.5, 0.45, [4]);
T(s, "Setahun: net owner " + jt(kosNet * 12) + " pada hunian 80%.", { x: 0.35, y: 4.6, w: 9.3, h: 0.4, fontSize: 14, bold: true, color: moss });

// 14 web build
s = base(); head(s, "Biaya bangun web diambil dari pos maintenance", "Tidak ditagih terpisah di depan. Dicicil dari 15% System & Marketing.");
table(s, [["Pembagian 15% System & Marketing (usulan)", "Porsi", "Per bulan"], ["Bangun web (dicicil)", "40%", rp(kosSys * 0.4)], ["Hosting, domain, maintenance web", "20%", rp(kosSys * 0.2)], ["Marketing & iklan unit kosong", "40%", rp(kosSys * 0.4)], ["Total pos System & Marketing", "100%", rp(kosSys)]], [5.3, 1.5, 2.5], 1.5, 0.45);
box(s, 0.35, 3.9, 9.3, 1.3, "Catatan", ["Total biaya bangun ditetapkan setelah ruang lingkup final, lalu dicicil dari pos ini", "Pembagian 40/20/40 adalah usulan, bisa diubah"]);

// 15 timeline
s = base(); head(s, "Enam minggu sampai tayang", "Tanpa pembayaran di muka; bangun web masuk ke pos System & Marketing.");
table(s, [["Minggu", "Pekerjaan"], ["1", "Riset alur, peta halaman, kumpulkan foto dan data unit"], ["2", "Desain layar utama dan ponsel, revisi dua putaran"], ["3–4", "Katalog, pencarian, halaman unit, form sewa"], ["5", "Papan kamar, grafik hunian, modul booking futsal"], ["6", "Isi data awal, training, domain & hosting, tayang"]], [1.5, 7.8], 1.5, 0.5);

// 16 pembatas
s = pptx.addSlide(); s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: ink } }); n++;
s.addText("Futsal & Cafe", { x: 0.7, y: 1.9, w: 12, h: 1, fontFace: "Georgia", fontSize: 44, bold: true, color: paper, margin: 0 });
s.addText("Estimasi pendapatan dan bagi hasil. Pengelola memegang manajemen penuh:\nmaintenance, event, marketing, karyawan, dan penggajian.", { x: 0.7, y: 3.1, w: 12, h: 1, fontFace: "Calibri", fontSize: 20, color: sand, margin: 0 });
s.addShape(pptx.ShapeType.rect, { x: 0.7, y: 4.4, w: 1.6, h: 0.08, fill: { color: clay } });
s.addText("Futsal: 30% dari revenue   ·   Cafe: 50% dari omzet   ·   Angka asumsi, wajib divalidasi dengan data lokasi", { x: 0.7, y: 4.7, w: 12, h: 0.5, fontFace: "Calibri", fontSize: 14, color: "D9CFBF", margin: 0 });

// 17 futsal revenue
s = base(); head(s, "Futsal: pendapatan per bulan", "Rate Rp120 rb per jam. Skenario realistis = 4 jam x 28 hari (sama dengan Excel).");
table(s, [["Komponen", ...S], ["Jam terjual / bulan", ...fut.map((f) => f.jam)], ["Total revenue", ...fut.map((f) => jt(f.rev))], ["Bagian pengelola 30%", ...fut.map((f) => jt(f.share))], ["Net income owner 70%", ...fut.map((f) => jt(f.owner))]], [3.6, 1.9, 1.9, 1.9], 1.5, 0.45, [4]);
T(s, "Setahun (realistis): revenue " + jt(fut[1].rev * 12) + ". Pendapatan kantin dan event belum dihitung.", { x: 0.35, y: 4.0, w: 9.3, h: 0.4, fontSize: 13, color: muted });

// 18 futsal 30%
s = base(); head(s, "Futsal: 30% dipakai untuk apa", "Usulan: maintenance 10 · event 8 · marketing 7 · fee pengelola 5.");
table(s, [["Pos (dari 30%)", "Porsi", ...S], ["Maintenance lapangan", "10%", ...fut.map((f) => jt(f.rev * 0.1))], ["Event management", "8%", ...fut.map((f) => jt(f.rev * 0.08))], ["Marketing", "7%", ...fut.map((f) => jt(f.rev * 0.07))], ["Fee pengelola", "5%", ...fut.map((f) => jt(f.rev * 0.05))], ["Total bagian pengelola", "30%", ...fut.map((f) => jt(f.share))]], [3.3, 1.0, 1.67, 1.67, 1.66], 1.45, 0.4);
chart(s, [ser("Maintenance", fut.map((f) => f.rev * 0.1 / 1e6)), ser("Event", fut.map((f) => f.rev * 0.08 / 1e6)), ser("Marketing", fut.map((f) => f.rev * 0.07 / 1e6)), ser("Fee", fut.map((f) => f.rev * 0.05 / 1e6))], 3.95, 1.35, [moss, clay, "E0A458", muted]);

// 19 futsal event & marketing
s = base(); head(s, "Futsal: event & marketing", "Dibiayai dari porsi event 8% dan marketing 7%.");
box(s, 0.35, 1.5, 4.55, 3.5, "Event management", ["Mini-league bulanan 8 tim", "Turnamen antar kantor / sekolah tiap kuartal", "Nobar pertandingan besar", "Sparring & open play untuk jam sepi", "Tugas: jadwal, wasit, hadiah, laporan"]);
box(s, 5.1, 1.5, 4.55, 3.5, "Marketing", ["Instagram & TikTok: highlight match, slot kosong harian", "Broadcast WhatsApp ke komunitas dan pemesan lama", "Promo jam sepi (hari kerja 16.00–18.00)", "Booking lewat web (halaman /futsal HUNI)", "Kerja sama komunitas, sekolah, kantor sekitar"], moss);

// 20 cafe dasar
s = base(); head(s, "Cafe: dasar hitungan", "Tiga skenario omzet, 3 karyawan tetap.");
box(s, 0.35, 1.5, 4.55, 3.5, "Omzet", ["Pelanggan per hari: 45 / 70 / 100", "Belanja rata-rata Rp30 rb / 33 rb / 35 rb", "Buka 30 hari per bulan, 10.00–21.00", "Omzet: " + cafe.map((c) => jt(c.rev)).join(" / ")]);
box(s, 5.1, 1.5, 4.55, 3.5, "Karyawan & bagi hasil", ["3 orang: waiters, cooks, kasir", "Bagian pengelola 50% dari omzet", "Gaji, marketing, event, maintenance keluar dari 50% ini", "Bahan baku, listrik, air, gas, internet: ditanggung pemilik dari 50% sisanya"], moss);

// 21 cafe revenue
s = base(); head(s, "Cafe: omzet dan bagi hasil", "Bulanan, juta rupiah.");
table(s, [["Komponen", ...S], ["Pelanggan / hari", ...cafe.map((c) => c.pax)], ["Belanja rata-rata", ...cafe.map((c) => rp(c.sp))], ["Omzet / bulan", ...cafe.map((c) => jt(c.rev))], ["Bagian pengelola 50%", ...cafe.map((c) => jt(c.share))], ["Sisa untuk pemilik 50%", ...cafe.map((c) => jt(c.rev - c.share))]], [3.6, 1.9, 1.9, 1.9], 1.5, 0.42, [3]);
T(s, "Setahun (realistis): omzet " + jt(cafe[1].rev * 12), { x: 0.35, y: 4.3, w: 9.3, h: 0.4, fontSize: 14, bold: true, color: moss });

// 22 biaya pemilik
s = base(); head(s, "Cafe: biaya ditanggung pemilik", "Dari sisa 50% omzet.");
table(s, [["Pos", ...S], ["Sisa 50% untuk pemilik", ...cafe.map((c) => jt(c.rev - c.share))], ["Bahan baku (35%)", ...cafe.map((c) => jt(c.hpp))], ["Packaging & habis pakai (3%)", ...cafe.map((c) => jt(c.pack))], ["Listrik 2,5 · air 0,4 · gas 0,5", ...cafe.map(() => "3,40 jt")], ["Internet 0,4 · kebersihan 0,3", ...cafe.map(() => "0,70 jt")], ["Sewa tempat (0 = milik sendiri)", ...cafe.map(() => "0,00 jt")], ["Sisa pemilik setelah biaya", ...cafe.map((c) => jt(c.ownerNet))]], [3.9, 1.8, 1.8, 1.8], 1.5, 0.42);

// 23 biaya pengelola
s = base(); head(s, "Cafe: 50% pengelola dipakai untuk apa", "Karyawan dulu, lalu marketing, event, maintenance; sisanya fee pengelola.");
table(s, [["Pos (dari 50%)", ...S], ["Bagian pengelola 50%", ...cafe.map((c) => jt(c.share))], ["Gaji 3 karyawan + BPJS/THR", ...cafe.map((c) => jt(c.pay))], ["Marketing (8%)", ...cafe.map((c) => jt(c.mkt))], ["Event (5%)", ...cafe.map((c) => jt(c.ev))], ["Maintenance alat & tempat (5%)", ...cafe.map((c) => jt(c.mt))], ["Fee pengelola (sisa)", ...cafe.map((c) => jt(c.fee))]], [3.9, 1.8, 1.8, 1.8], 1.45, 0.4);
chart(s, [ser("Gaji", cafe.map((c) => c.pay / 1e6)), ser("Marketing", cafe.map((c) => c.mkt / 1e6)), ser("Event", cafe.map((c) => c.ev / 1e6)), ser("Maintenance", cafe.map((c) => c.mt / 1e6)), ser("Fee", cafe.map((c) => c.fee / 1e6))], 4.1, 1.25, [moss, clay, "E0A458", muted, clayDeep]);

// 24 karyawan
s = base(); head(s, "Cafe: 3 karyawan dan penggajian", "Gaji pokok asumsi, cek UMK setempat.");
table(s, [["Posisi", "Gaji / bulan", "Tugas"], ["Waiters", rp(2.4e6), "Antar pesanan, bersih meja, layani pelanggan"], ["Cooks", rp(2.8e6), "Masak, siapkan bahan, jaga stok dapur"], ["Kasir", rp(2.5e6), "Transaksi, catat penjualan, tutup kas harian"], ["BPJS / THR cadangan 10%", rp(0.77e6), ""], ["Total per bulan", rp(8.47e6), ""]], [3.0, 2.2, 4.1], 1.5, 0.45);
T(s, "Catatan: dengan 3 orang tanpa pengganti, hari libur harus ditutup pengelola atau jam buka dipendekkan. Gaji dibayar tanggal 1.", { x: 0.35, y: 4.5, w: 9.3, h: 0.6, fontSize: 12, color: muted });

// 25 cafe event & marketing
s = base(); head(s, "Cafe: event & marketing", "Dibiayai dari porsi marketing 8% dan event 5%.");
box(s, 0.35, 1.5, 4.55, 3.5, "Event", ["Live music akustik tiap Jumat malam", "Nobar & kuis mingguan", "Kelas kopi dan workshop komunitas", "Paket ulang tahun / arisan / rapat kecil", "Paket gabungan main futsal + ngopi"]);
box(s, 5.1, 1.5, 4.55, 3.5, "Marketing", ["Konten harian IG/TikTok: menu baru, suasana, promo", "Kartu loyalitas / stempel digital", "Promo jam sepi (14.00–17.00)", "Pre-order & pesan antar lewat WhatsApp", "Google Maps: foto, ulasan, jam buka terbaru"], moss);

// 26 keputusan
s = base(); head(s, "Yang perlu diputuskan sebelum diajukan");
box(s, 0.35, 1.2, 9.3, 1.9, "Cafe: sisa pemilik tipis", [`Realistis: sisa 50% ${jt(cafe[1].rev - cafe[1].share)}, dikurangi bahan baku, packaging, dan biaya tetap, tinggal ${jt(cafe[1].ownerNet)}. Konservatif tinggal ${jt(cafe[0].ownerNet)}.`, "Lebih mudah disetujui: 50% dari laba kotor (omzet dikurangi bahan baku), atau porsi 40%."], clayDeep);
box(s, 0.35, 3.25, 9.3, 1.9, "Langkah berikut", ["Ganti asumsi (pelanggan, gaji, listrik, sewa) dengan data lokasi di file Excel", "Tulis kontrak: dasar hitung, laporan bulanan, cek kas", "Uji 3 bulan pertama, lalu evaluasi porsi 30% / 50%"]);
}

await mkdir("/home/claude/ws/public/pitch", { recursive: true });
await pptx.writeFile({ fileName: "/home/claude/ws/public/pitch/HUNI-Pitch-Deck-Lengkap.pptx" });
console.log("pptx written");
