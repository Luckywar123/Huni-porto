import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Shell } from "@/components/shell";
import { ROOM_ORDER, useHuni, type RoomStatus } from "@/data/store";

export const Route = createFileRoute("/pemilik")({
  component: PemilikPage,
});

const occupancy = [
  { bulan: "Mei", persen: 75 },
  { bulan: "Jun", persen: 83 },
  { bulan: "Jul", persen: 67 },
  { bulan: "Agu", persen: 83 },
  { bulan: "Sep", persen: 92 },
  { bulan: "Okt", persen: 75 },
];

const tone: Record<RoomStatus, string> = {
  isi: "bg-moss text-paper",
  kosong: "bg-card text-ink border border-line",
  booking: "bg-clay text-paper",
};

const label: Record<RoomStatus, string> = {
  isi: "Isi",
  kosong: "Kosong",
  booking: "Booking",
};

function PemilikPage() {
  const rooms = useHuni((state) => state.rooms);
  const cycleRoom = useHuni((state) => state.cycleRoom);
  const inquiries = useHuni((state) => state.inquiries);

  useEffect(() => {
    void useHuni.persist.rehydrate();
  }, []);

  const counts = ROOM_ORDER.reduce(
    (acc, id) => {
      const status = rooms[id] ?? "kosong";
      acc[status] += 1;
      return acc;
    },
    { isi: 0, kosong: 0, booking: 0 },
  );

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm font-medium tracking-widest text-clay-deep uppercase">Papan contoh</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Kos Melati · 12 kamar</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Ketuk kamar untuk mengganti status: isi, kosong, lalu booking. Pengajuan dari halaman unit masuk di
          kolom kanan. Angka hunian bulanan di bawah ini contoh, tidak dihitung dari papan.
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {(
            [
              ["Isi", counts.isi, "bg-moss text-paper"],
              ["Booking", counts.booking, "bg-clay text-paper"],
              ["Kosong", counts.kosong, "bg-card text-ink border border-line"],
            ] as const
          ).map(([name, value, cls]) => (
            <div key={name} className={`rounded-lg px-4 py-4 ${cls}`}>
              <dt className="text-sm opacity-80">{name}</dt>
              <dd className="font-display text-3xl">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-line bg-card p-4">
            <h2 className="font-display text-2xl">Denah kamar</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {ROOM_ORDER.map((id) => {
                const status = rooms[id] ?? "kosong";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => cycleRoom(id)}
                    className={`min-h-16 rounded-md px-2 py-3 text-left ${tone[status]}`}
                  >
                    <span className="block text-sm font-medium">{id}</span>
                    <span className="text-xs">{label[status]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-line bg-card p-4">
            <h2 className="font-display text-2xl">Pengajuan masuk</h2>
            <ul className="mt-4 space-y-3">
              {inquiries.map((item) => (
                <li key={item.id} className="rounded-md border border-line bg-paper px-3 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted">{item.moveIn}</p>
                  </div>
                  <p className="text-sm text-muted">
                    {item.listingName} · {item.phone}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
                  <Link
                    to="/unit/$id"
                    params={{ id: item.listingId }}
                    className="mt-1 inline-block text-sm text-clay-deep underline decoration-clay underline-offset-4"
                  >
                    Lihat unit
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-line bg-card p-4">
          <h2 className="font-display text-2xl">Hunian Mei–Oktober</h2>
          <p className="text-sm text-muted">Persen kamar terisi, data contoh Kos Melati.</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancy}>
                <XAxis dataKey="bulan" tick={{ fill: "#6f675c", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#6f675c", fontSize: 12 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip
                  cursor={{ fill: "#ebe3d4" }}
                  contentStyle={{ background: "#fbf8f3", border: "1px solid #d9cfbf", borderRadius: 8 }}
                  formatter={(value) => [`${value}%`, "Terisi"]}
                />
                <Bar dataKey="persen" fill="#2f5d50" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </Shell>
  );
}
