import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/proposal")({
  component: ProposalPage,
});

const packages = [
  {
    name: "Dasar",
    price: "Rp12,5 juta",
    note: "1 properti · sampai 15 unit · 3 minggu",
    points: ["Beranda, katalog, halaman unit", "Form sewa", "Domain, hosting, SSL tahun pertama", "Training 1 sesi", "Garansi bug 90 hari"],
  },
  {
    name: "Kelola",
    price: "Rp24,5 juta",
    note: "Sampai 3 properti · 40 unit · 6 minggu",
    points: ["Semua yang di Dasar", "Papan kamar dan daftar pengajuan", "Grafik hunian", "Dua peran: pemilik dan pengelola", "Training 2 sesi"],
    featured: true,
  },
  {
    name: "Penuh",
    price: "Rp42 juta",
    note: "Sampai 150 unit · 8–10 minggu",
    points: ["Semua yang di Kelola", "DP lewat payment gateway", "Invoice dan pengingat jatuh tempo", "Laporan uang masuk", "Bisa dipasang di layar utama HP"],
  },
];

const buildRows = [
  ["Riset alur dan peta halaman", "1,5"],
  ["Desain empat layar plus ponsel", "5,5"],
  ["Katalog, cari, halaman unit", "6,0"],
  ["Form sewa dan unit tersimpan", "2,0"],
  ["Papan kamar dan grafik hunian", "5,5"],
  ["Isi data awal, paling banyak 15 unit", "2,0"],
  ["Training dua sesi dan catatan pakai", "1,0"],
  ["Domain, hosting, SSL tahun pertama", "1,0"],
];

const care = [
  {
    name: "Ringan",
    price: "Rp450 rb",
    rows: [
      ["Hosting dan backup mingguan", "180"],
      ["Update keamanan", "120"],
      ["Satu ubahan kecil", "100"],
      ["Support jam kerja", "50"],
    ],
  },
  {
    name: "Kelola",
    price: "Rp950 rb",
    rows: [
      ["Hosting dan backup harian", "250"],
      ["Monitoring dan keamanan", "200"],
      ["Empat ubahan konten", "300"],
      ["Perbaikan bug kecil", "150"],
      ["Catatan hunian sebulan", "50"],
    ],
  },
  {
    name: "Penuh",
    price: "Rp1,85 jt",
    rows: [
      ["Isi paket Kelola", "950"],
      ["Bantuan invoice ringan", "400"],
      ["Dua naskah iklan kamar kosong", "300"],
      ["Darurat di luar jam kerja", "200"],
    ],
  },
];

function ProposalPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm font-medium tracking-widest text-clay-deep uppercase">Penawaran ilustrasi · Oktober 2026</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Harga bangun dan biaya rawat</h1>
        <p className="mt-3 max-w-3xl text-ink-soft">
          Angka untuk satu pemilik atau pengelola, bukan marketplace nasional. Belum mengikat. Disesuaikan setelah
          jumlah unit dan kondisi foto diketahui. Rincian yang sama ada di pitch deck.
        </p>
        <a
          href="/pitch/HUNI-Pitch-Deck.pptx"
          className="mt-5 inline-block rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper"
        >
          Unduh pitch deck
        </a>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.name}
              className={
                item.featured
                  ? "rounded-lg border-2 border-moss bg-moss px-5 py-5 text-paper"
                  : "rounded-lg border border-line bg-card px-5 py-5"
              }
            >
              <p className={item.featured ? "text-sm text-sand" : "text-sm text-muted"}>
                {item.featured ? "Disarankan" : "Paket"}
              </p>
              <h2 className="mt-1 font-display text-3xl">{item.name}</h2>
              <p className="mt-2 font-display text-2xl">{item.price}</p>
              <p className={item.featured ? "mt-1 text-sm text-sand" : "mt-1 text-sm text-muted"}>{item.note}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="font-display text-3xl">Rincian paket Kelola</h2>
          <p className="mt-2 text-muted">Sekali bayar. Satuan juta rupiah.</p>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <tbody>
              {buildRows.map(([label, value]) => (
                <tr key={label} className="border-b border-line">
                  <th scope="row" className="py-3 pr-3 font-normal">
                    {label}
                  </th>
                  <td className="py-3 text-right font-medium">{value}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="py-3 font-medium">
                  Jumlah
                </th>
                <td className="py-3 text-right font-display text-2xl">24,5</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl">Rawat per bulan</h2>
          <p className="mt-2 max-w-3xl text-muted">
            Mulai bulan keempat. Tiga bulan pertama setelah tayang termasuk garansi bug. Domain dan hosting tahun
            berikutnya sudah masuk di sini, tidak ditagih terpisah. Angka dalam ribu rupiah.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {care.map((item) => (
              <article key={item.name} className="rounded-lg border border-line bg-card p-4">
                <h3 className="font-display text-2xl">
                  {item.name} · {item.price}
                </h3>
                <table className="mt-3 w-full text-sm">
                  <tbody>
                    {item.rows.map(([label, value]) => (
                      <tr key={label} className="border-b border-line">
                        <th scope="row" className="py-2 pr-2 text-left font-normal text-ink-soft">
                          {label}
                        </th>
                        <td className="py-2 text-right">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 overflow-x-auto">
          <h2 className="font-display text-3xl">Tiga tahun punya</h2>
          <p className="mt-2 text-muted">Juta rupiah. Tahun pertama = bangun + 9 bulan rawat.</p>
          <table className="mt-4 w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink text-muted">
                <th className="py-2 pr-3 font-medium">Komponen</th>
                <th className="py-2 pr-3 font-medium">Dasar + Ringan</th>
                <th className="py-2 pr-3 font-medium">Kelola + Kelola</th>
                <th className="py-2 font-medium">Penuh + Penuh</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Bangun", "12,50", "24,50", "42,00"],
                ["Rawat 9 bulan", "4,05", "8,55", "16,65"],
                ["Tahun 1", "16,55", "33,05", "58,65"],
                ["Tahun 2", "5,40", "11,40", "22,20"],
                ["Tahun 3", "5,40", "11,40", "22,20"],
                ["Total 3 tahun", "27,35", "55,85", "103,05"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  {row.map((cell, index) => (
                    <td key={cell} className={index === 0 ? "py-3 pr-3 font-medium" : "py-3 pr-3"}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg bg-ink px-5 py-5 text-paper">
            <h2 className="font-display text-2xl">Cara bayar paket Kelola</h2>
            <ul className="mt-3 space-y-2 text-sm text-sand">
              <li>40% mulai kerja — Rp9,8 juta</li>
              <li>30% desain disetujui — Rp7,35 juta</li>
              <li>30% saat tayang — Rp7,35 juta</li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-card px-5 py-5">
            <h2 className="font-display text-2xl">Tidak termasuk</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>Foto profesional di lokasi, tambahan Rp1,5–3 juta</li>
              <li>Iklan berbayar</li>
              <li>Potongan payment gateway per transaksi</li>
              <li>Perubahan besar setelah tayang</li>
            </ul>
          </article>
        </section>

        <p className="mt-8 text-sm leading-relaxed text-muted">
          Ilustrasi, bukan janji hunian. Rawat Kelola setahun Rp11,4 juta kira-kira sama dengan satu kamar Rp1,2
          juta yang terisi 10 bulan. Calo sering mengambil satu bulan sewa per penempatan; inquiry langsung
          mengurangi bagian itu, tetapi tidak menghilangkannya.
        </p>
      </main>
    </Shell>
  );
}
