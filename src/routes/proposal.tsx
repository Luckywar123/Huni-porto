import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

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
  { name: "Lapangan futsal", share: "30%", points: ["Maintenance 10%, event 8%", "Marketing 7%, fee pengelola 5%", "Booking lewat halaman Futsal"], featured: true },
  { name: "Cafe", share: "50%", points: ["Gaji 3 karyawan, marketing, event, maintenance", "Sisa 50% untuk pemilik", "Fee pengelola = sisa dari 50%"] },
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

        <p className="mt-8 text-sm leading-relaxed text-muted">
          Ilustrasi, bukan janji hunian. Rincian futsal dan cafe ada di pitch deck dan file Excel.
        </p>
      </main>
    </Shell>
  );
}
