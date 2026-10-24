import PptxGenJS from "pptxgenjs";
import { mkdir } from "node:fs/promises";

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "HUNI", width: 13.333, height: 7.5 });
pptx.layout = "HUNI";
pptx.author = "HUNI";
pptx.title = "HUNI — Proposal website kos dan kontrakan";
pptx.subject = "Desain, proof of concept, harga bangun, dan biaya rawat";

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
const TOTAL = 16;
const deck = "/workspace/artifacts/deck";

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
    path: "/workspace/public/media/ext.jpg",
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
    "Proposal untuk pemilik yang mau punya situs sendiri:\ndesain, proof of concept, harga bangun, dan biaya rawat.",
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
    "Paket Penuh: DP, invoice, laporan uang",
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
  ["Kos Melati", "Satu properti dulu. Multi-properti ada di paket penuh."],
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
    "Halaman harga yang sama dengan deck ini",
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
    "Pembayaran DP dan invoice (paket Penuh)",
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

// 11 Paket
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 11);
  h1(s, "Tiga paket bangun. Sekali bayar.");
  s.addText("Termasuk domain, hosting, dan SSL untuk tahun pertama. Revisi desain dua putaran di semua paket.", {
    x: 0.42,
    y: 0.84,
    w: 12.3,
    h: 0.3,
    fontFace: "Calibri",
    fontSize: 14,
    color: muted,
    margin: 0,
  });
  const packs = [
    {
      name: "Dasar",
      price: "Rp12,5 juta",
      time: "3 minggu  ·  1 properti, ≤15 unit",
      lines: ["Beranda, katalog, halaman unit", "Form ajukan sewa", "SEO dasar dan isi sampai 8 unit", "Training satu sesi", "Garansi bug 90 hari"],
      fill: card,
      title: ink,
      body: soft,
      priceColor: clayDeep,
    },
    {
      name: "Kelola",
      price: "Rp24,5 juta",
      time: "6 minggu  ·  ≤3 properti, 40 unit",
      lines: ["Semua isi Dasar", "Papan kamar dan daftar pengajuan", "Grafik hunian", "Pemilik dan pengelola", "Training dua sesi"],
      fill: moss,
      title: paper,
      body: sand,
      priceColor: paper,
    },
    {
      name: "Penuh",
      price: "Rp42 juta",
      time: "8–10 minggu  ·  sampai 150 unit",
      lines: ["Semua isi Kelola", "DP lewat payment gateway", "Invoice dan pengingat tempo", "Laporan uang masuk", "Ikon layar utama HP"],
      fill: ink,
      title: paper,
      body: sand,
      priceColor: sand,
    },
  ];
  packs.forEach((pack, i) => {
    const x = 0.42 + i * 4.25;
    box(s, x, 1.3, 4.05, 5.15, pack.fill);
    const tag = i === 1 ? "Disarankan" : "Paket";
    s.addText(tag, { x: x + 0.24, y: 1.48, w: 3.55, h: 0.26, fontFace: "Calibri", fontSize: 12, bold: true, color: i === 1 ? sand : muted, margin: 0 });
    s.addText(pack.name, { x: x + 0.24, y: 1.78, w: 3.55, h: 0.42, fontFace: "Georgia", fontSize: 26, color: pack.title, margin: 0 });
    s.addText(pack.price, { x: x + 0.24, y: 2.28, w: 3.55, h: 0.4, fontFace: "Georgia", fontSize: 22, color: pack.priceColor, margin: 0 });
    s.addText(pack.time, { x: x + 0.24, y: 2.74, w: 3.55, h: 0.5, fontFace: "Calibri", fontSize: 13, color: pack.body, margin: 0 });
    pack.lines.forEach((lineText, li) => {
      s.addText(lineText, {
        x: x + 0.24,
        y: 3.4 + li * 0.52,
        w: 3.55,
        h: 0.48,
        fontFace: "Calibri",
        fontSize: 14,
        color: pack.body,
        margin: 0,
      });
    });
  });
}

// 12 Breakdown
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 12);
  h1(s, "Rincian paket Kelola — Rp24,5 juta");
  const rows = [
    ["Riset alur dan peta halaman", "Rp1.500.000"],
    ["Desain empat layar, termasuk ponsel", "Rp5.500.000"],
    ["Katalog, pencarian, halaman unit", "Rp6.000.000"],
    ["Form sewa dan simpan unit", "Rp2.000.000"],
    ["Papan kamar dan grafik hunian", "Rp5.500.000"],
    ["Isi data awal, paling banyak 15 unit, SEO dasar", "Rp2.000.000"],
    ["Training dua sesi dan catatan cara pakai", "Rp1.000.000"],
    ["Domain, hosting, dan SSL tahun pertama", "Rp1.000.000"],
    ["Jumlah", "Rp24.500.000"],
  ];
  const tableRows = rows.map((row, i) => {
    const last = i === rows.length - 1;
    return row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: last ? ink : i % 2 === 0 ? card : paper },
        color: last ? paper : ink,
        bold: last || ci === 1,
        align: ci === 1 ? "right" : "left",
        fontFace: "Calibri",
        fontSize: 14,
        valign: "middle",
        margin: [6, 10, 6, 10],
      },
    }));
  });
  s.addTable(tableRows, {
    x: 0.42,
    y: 1.1,
    w: 12.5,
    colW: [8.7, 3.8],
    border: [{ pt: 0, color: paper }, { pt: 0, color: paper }, { pt: 0, color: paper }, { pt: 0, color: paper }],
    fontFace: "Calibri",
    color: ink,
    rowH: 0.48,
  });
  s.addText("Dasar (Rp12,5 jt) memotong papan kamar. Penuh (Rp42 jt) menambah gateway, invoice, laporan, dan pemasangan di HP di atas angka Kelola.", {
    x: 0.42,
    y: 6.55,
    w: 12.4,
    h: 0.5,
    fontFace: "Calibri",
    fontSize: 13,
    color: muted,
    margin: 0,
  });
}

// 13 Maintenance
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 13);
  h1(s, "Biaya rawat, per bulan, sudah dipecah.");
  s.addText("Mulai bulan keempat. Tiga bulan pertama setelah tayang: perbaikan bug pembangunan tidak ditagih. Jam kerja Senin–Jumat, 09.00–17.00 WIB.", {
    x: 0.42,
    y: 0.84,
    w: 12.4,
    h: 0.48,
    fontFace: "Calibri",
    fontSize: 14,
    color: muted,
    margin: 0,
  });
  const cares = [
    {
      name: "Ringan",
      price: "Rp450.000",
      rows: [
        ["Hosting, backup mingguan", "180 rb"],
        ["Update keamanan", "120 rb"],
        ["Satu ubahan kecil", "100 rb"],
        ["Support chat jam kerja", "50 rb"],
      ],
    },
    {
      name: "Kelola",
      price: "Rp950.000",
      rows: [
        ["Hosting, backup harian", "250 rb"],
        ["Monitoring dan keamanan", "200 rb"],
        ["Empat ubahan konten", "300 rb"],
        ["Bug kecil", "150 rb"],
        ["Catatan hunian", "50 rb"],
      ],
    },
    {
      name: "Penuh",
      price: "Rp1.850.000",
      rows: [
        ["Semua isi Kelola", "950 rb"],
        ["Bantuan invoice ringan", "400 rb"],
        ["Dua naskah iklan", "300 rb"],
        ["Darurat luar jam kerja", "200 rb"],
      ],
    },
  ];
  cares.forEach((item, i) => {
    const x = 0.42 + i * 4.25;
    const featured = i === 1;
    box(s, x, 1.48, 4.05, featured ? 5.45 : 5.0, featured ? moss : card);
    s.addText(featured ? "Disarankan berdampingan dengan paket Kelola" : "Per bulan", {
      x: x + 0.22,
      y: 1.64,
      w: 3.6,
      h: 0.28,
      fontFace: "Calibri",
      fontSize: 12,
      color: featured ? sand : muted,
      margin: 0,
    });
    s.addText(item.name, {
      x: x + 0.22,
      y: 1.94,
      w: 3.6,
      h: 0.36,
      fontFace: "Georgia",
      fontSize: 22,
      color: featured ? paper : ink,
      margin: 0,
    });
    s.addText(item.price, {
      x: x + 0.22,
      y: 2.34,
      w: 3.6,
      h: 0.34,
      fontFace: "Calibri",
      fontSize: 16,
      bold: true,
      color: featured ? paper : clayDeep,
      margin: 0,
    });
    item.rows.forEach((row, ri) => {
      const y = 2.85 + ri * 0.55;
      s.addText(row[0], {
        x: x + 0.22,
        y,
        w: 2.3,
        h: 0.48,
        fontFace: "Calibri",
        fontSize: 13,
        color: featured ? sand : soft,
        margin: 0,
      });
      s.addText(row[1], {
        x: x + 2.4,
        y,
        w: 1.4,
        h: 0.48,
        fontFace: "Calibri",
        fontSize: 13,
        align: "right",
        bold: true,
        color: featured ? paper : ink,
        margin: 0,
      });
    });
  });
}

// 14 Tiga tahun
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 14);
  h1(s, "Biaya punya, tiga tahun. Juta rupiah.");
  s.addText("Tahun pertama = bangun + 9 bulan rawat. Tahun kedua dan ketiga = rawat saja. Domain dan hosting sudah termasuk, tidak muncul sebagai tagihan lain.", {
    x: 0.42,
    y: 0.86,
    w: 12.4,
    h: 0.5,
    fontFace: "Calibri",
    fontSize: 14,
    color: muted,
    margin: 0,
  });
  const head = ["", "Dasar + Ringan", "Kelola + Kelola", "Penuh + Penuh"];
  const body = [
    ["Bangun", "12,50", "24,50", "42,00"],
    ["Rawat 9 bulan", "4,05", "8,55", "16,65"],
    ["Tahun 1", "16,55", "33,05", "58,65"],
    ["Tahun 2", "5,40", "11,40", "22,20"],
    ["Tahun 3", "5,40", "11,40", "22,20"],
    ["Total 3 tahun", "27,35", "55,85", "103,05"],
  ];
  const all = [head, ...body].map((row, ri) =>
    row.map((cell, ci) => {
      const last = ri === body.length;
      const header = ri === 0;
      return {
        text: cell,
        options: {
          fill: { color: header ? ink : last ? "E7DCC8" : ri % 2 === 0 ? card : paper },
          color: header ? paper : ink,
          bold: header || last || ci === 0,
          align: ci === 0 ? "left" : "right",
          fontFace: "Calibri",
          fontSize: 15,
          valign: "middle",
          margin: [8, 12, 8, 12],
        },
      };
    }),
  );
  s.addTable(all, {
    x: 0.42,
    y: 1.55,
    w: 12.5,
    colW: [3.3, 3.06, 3.06, 3.08],
    border: [
      { pt: 0, color: paper },
      { pt: 0, color: paper },
      { pt: 0, color: paper },
      { pt: 0, color: paper },
    ],
    rowH: 0.58,
  });
  s.addText("Pasangkan Dasar dengan Ringan, Kelola dengan Kelola, Penuh dengan Penuh. Mencampur boleh, angkanya bergeser.", {
    x: 0.42,
    y: 6.55,
    w: 12.4,
    h: 0.4,
    fontFace: "Calibri",
    fontSize: 14,
    color: muted,
    margin: 0,
  });
}

// 15 Jadwal
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 15);
  h1(s, "Enam minggu untuk paket Kelola. Dibayar tiga kali.");
  const weeks = [
    ["Minggu 1", "Kumpulkan jumlah kamar, harga, dan foto yang ada. Kunci peta halaman."],
    ["Minggu 2", "Desain dikunci. Dua putaran revisi. Belum coding besar."],
    ["Minggu 3–4", "Katalog, halaman unit, dan form sewa."],
    ["Minggu 5", "Papan pemilik, isi data, cek di ponsel."],
    ["Minggu 6", "Uji, training, tayang di domain klien."],
  ];
  weeks.forEach((week, i) => {
    const y = 1.05 + i * 0.72;
    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.42,
      y,
      w: 1.7,
      h: 0.58,
      fill: { color: i === 4 ? clay : ink },
      rectRadius: 0.06,
    });
    s.addText(week[0], {
      x: 0.42,
      y,
      w: 1.7,
      h: 0.58,
      align: "center",
      valign: "middle",
      fontFace: "Calibri",
      fontSize: 12,
      bold: true,
      color: paper,
      margin: 0,
    });
    s.addText(week[1], {
      x: 2.3,
      y,
      w: 6.1,
      h: 0.58,
      valign: "middle",
      fontFace: "Calibri",
      fontSize: 14,
      color: ink,
      margin: 0,
    });
  });
  box(s, 8.6, 1.05, 4.3, 3.55, ink);
  s.addText("Cara bayar", { x: 8.84, y: 1.25, w: 3.9, h: 0.32, fontFace: "Georgia", fontSize: 18, color: paper, margin: 0 });
  const pays = [
    ["40% mulai", "Rp9,8 juta"],
    ["30% desain jadi", "Rp7,35 juta"],
    ["30% saat tayang", "Rp7,35 juta"],
  ];
  pays.forEach((pay, i) => {
    s.addText(pay[0], { x: 8.84, y: 1.8 + i * 0.75, w: 3.9, h: 0.28, fontFace: "Calibri", fontSize: 13, color: sand, margin: 0 });
    s.addText(pay[1], { x: 8.84, y: 2.08 + i * 0.75, w: 3.9, h: 0.32, fontFace: "Georgia", fontSize: 18, color: paper, margin: 0 });
  });
  box(s, 8.6, 4.75, 4.3, 2.15);
  s.addText("Di luar harga", { x: 8.82, y: 4.92, w: 3.9, h: 0.3, fontFace: "Georgia", fontSize: 16, color: ink, margin: 0 });
  s.addText("Foto di lokasi Rp1,5–3 juta.\nIklan berbayar.\nPotongan gateway per transaksi.\nPerubahan besar setelah tayang.", {
    x: 8.82,
    y: 5.28,
    w: 3.9,
    h: 1.4,
    fontFace: "Calibri",
    fontSize: 13,
    color: soft,
    margin: 0,
  });
}

// 16 Tutup
{
  const s = pptx.addSlide();
  light(s);
  foot(s, 16);
  h1(s, "Jangan janji kamar penuh. Hitung yang hilang.");
  box(s, 0.42, 1.1, 8.15, 3.35);
  s.addText("Ilustrasi, bukan proyeksi.", {
    x: 0.66,
    y: 1.28,
    w: 7.7,
    h: 0.3,
    fontFace: "Calibri",
    fontSize: 13,
    bold: true,
    color: clayDeep,
    margin: 0,
  });
  s.addText(
    "Rawat Kelola setahun Rp11,4 juta. Itu kira-kira satu kamar sewa Rp1,2 juta yang terisi sepuluh bulan.\n\nCalo yang mengambil satu bulan sewa, enam kali setahun, sudah Rp7,2 juta. Situs tidak menghapus calo. Ia memberi jalan bagi yang mau sewa langsung, dan membuat harga tidak berubah-ubah di chat.",
    {
      x: 0.66,
      y: 1.68,
      w: 7.6,
      h: 2.5,
      fontFace: "Calibri",
      fontSize: 15,
      color: soft,
      margin: 0,
    },
  );
  box(s, 8.75, 1.1, 4.15, 3.35, moss);
  s.addText("Langkah berikut", {
    x: 8.98,
    y: 1.3,
    w: 3.75,
    h: 0.36,
    fontFace: "Georgia",
    fontSize: 18,
    color: paper,
    margin: 0,
  });
  const next = ["Kirim jumlah kamar dan kota", "Lampirkan foto yang sudah ada", "Pilih paket", "DP 40%, minggu desain dimulai"];
  next.forEach((lineText, i) => {
    s.addText(String(i + 1) + "   " + lineText, {
      x: 8.98,
      y: 1.85 + i * 0.55,
      w: 3.7,
      h: 0.48,
      fontFace: "Calibri",
      fontSize: 14,
      color: sand,
      margin: 0,
    });
  });
  s.addText("HUNI", {
    x: 0.42,
    y: 4.7,
    w: 12.4,
    h: 0.7,
    fontFace: "Georgia",
    fontSize: 42,
    color: ink,
    margin: 0,
  });
  s.addText("Demo bisa diklik sekarang: cari unit, ajukan sewa, ubah status kamar.\nBerkas ini adalah lembar yang ditinggal setelah meeting.", {
    x: 0.42,
    y: 5.5,
    w: 12.4,
    h: 0.7,
    fontFace: "Calibri",
    fontSize: 16,
    color: soft,
    margin: 0,
  });
  s.addText("Angka pasar jasa website 2026 dipakai sebagai acuan kisaran, lalu disusun ulang untuk ruang lingkup kos dan kontrakan. Bukan kutipan harga vendor tertentu.", {
    x: 0.42,
    y: 6.4,
    w: 12.4,
    h: 0.55,
    fontFace: "Calibri",
    fontSize: 12,
    color: muted,
    margin: 0,
  });
}

await mkdir("/workspace/public/pitch", { recursive: true });
await pptx.writeFile({ fileName: "/workspace/public/pitch/HUNI-Pitch-Deck.pptx" });
await pptx.writeFile({ fileName: "/workspace/artifacts/HUNI-Pitch-Deck.pptx" });
console.log("pptx written");
