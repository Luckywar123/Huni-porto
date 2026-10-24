import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { pnlGross, pnlOps, pnlOwner, pnlRows } from "@/data/pnl";

export const Route = createFileRoute("/proposal")({
  component: ProposalPage,
});

const rp = (n: number) => `Rp${Math.round(n).toLocaleString("id-ID")}`;
const total = 2_800_000 + 12 * 2_300_000 + 7 * 2_000_000;
const target = total * 0.8;
const sys = target * 0.15;
const ops = target * 0.15;

const models = [
  { name: "Kos & kontrakan", share: "30%", points: ["15% System & Marketing", "15% Perawatan & operasional", "Build web diambil dari pos System"] },
  { name: "Lapangan futsal", share: "30%", points: ["Maintenance 8%, event 9%", "Marketing 9%, fee pengelola 4%", "Turnamen sekolah dan booking lewat web"], featured: true },
  { name: "Cafe", share: "20%", points: ["Include marketing, branding, operasional, biaya POS", "Karyawan 3 orang dihitung terpisah", "Sisanya net income owner"] },
];

function ProposalPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm font-medium tracking-widest text-clay-deep uppercase">Model kerja sama · ilustrasi</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Bagi hasil, bukan paket harga</h1>
        <p className="mt-3 max-w-3xl text-ink-soft">
          Tidak ada pilihan paket. Pengelola dibayar dari persentase pendapatan, dan biaya bangun web diambil dari pos
          System & Marketing, bukan ditagih di depan. Angka contoh, belum mengikat.
        </p>
        <a
          href="/pitch/HUNI-Pitch-Deck-Lengkap.pptx"
          className="mt-5 inline-block rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper"
        >
          Unduh pitch deck
        </a>
        <a
          href="/pitch/Cafe_Futsall_Kosan.xlsx"
          className="mt-5 ml-2 inline-block rounded-md border border-ink px-5 py-3 text-sm font-medium text-ink"
        >
          Unduh hitungan Excel
        </a>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {models.map((item) => (
            <article
              key={item.name}
              className={item.featured ? "rounded-lg border-2 border-moss bg-moss px-5 py-5 text-paper" : "rounded-lg border border-line bg-card px-5 py-5"}
            >
              <h2 className="font-display text-3xl">{item.name}</h2>
              <p className="mt-2 font-display text-2xl">{item.share} dari pendapatan</p>
              <ul className="mt-4 space-y-2 text-sm">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-10 overflow-x-auto">
          <h2 className="font-display text-3xl">Contoh kos: 20 unit, hunian 80%</h2>
          <table className="mt-4 w-full min-w-[30rem] border-collapse text-left text-sm">
            <tbody>
              {[
                ["Potensi income jika penuh", rp(total)],
                ["Target income (80%)", rp(target)],
                ["System & Marketing 15% (termasuk build web)", rp(sys)],
                ["Perawatan & operasional 15%", rp(ops)],
                ["Net income owner", rp(target - sys - ops)],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-line">
                  <th scope="row" className="py-3 pr-3 font-normal">{label}</th>
                  <td className="py-3 text-right font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-12 overflow-x-auto">
          <h2 className="font-display text-3xl">Total PNL revenue owner</h2>
          <p className="mt-1 text-sm text-muted">Total PNL omzet per bulan, tiga unit usaha.</p>
          <table className="mt-4 w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-ink text-paper">
                <th className="px-3 py-3 font-medium">Summary</th>
                <th className="px-3 py-3 text-right font-medium">Gross (target income)</th>
                <th className="px-3 py-3 text-right font-medium">Operasional</th>
              </tr>
            </thead>
            <tbody>
              {pnlRows.map((row) => (
                <tr key={row.name} className="border-b border-line">
                  <th scope="row" className="px-3 py-3 font-normal uppercase">{row.name}</th>
                  <td className="px-3 py-3 text-right">{rp(row.gross)}</td>
                  <td className="px-3 py-3 text-right">{rp(row.ops)}</td>
                </tr>
              ))}
              <tr className="border-b border-line bg-card font-medium">
                <th scope="row" className="px-3 py-3">Total gross income & operasional</th>
                <td className="px-3 py-3 text-right">{rp(pnlGross)}</td>
                <td className="px-3 py-3 text-right">{rp(pnlOps)}</td>
              </tr>
              <tr className="bg-moss font-medium text-paper">
                <th scope="row" className="px-3 py-3">Total income owner</th>
                <td className="px-3 py-3" />
                <td className="px-3 py-3 text-right font-display text-xl">{rp(pnlOwner)}</td>
              </tr>
            </tbody>
          </table>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            {pnlRows.map((row) => (
              <li key={row.name}>
                <span className="font-medium text-ink-soft">{row.name}:</span> {row.basis}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            Catatan: dengan 3 orang tanpa pengganti, hari libur harus ditutup Andre sebagai operasional atau jam buka
            dipendekkan. Gaji dibayar tanggal 1.
          </p>
        </section>

        <p className="mt-8 text-sm leading-relaxed text-muted">
          Ilustrasi, bukan janji hunian. Rincian futsal dan cafe ada di pitch deck dan file Excel.
        </p>
      </main>
    </Shell>
  );
}
