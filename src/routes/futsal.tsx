import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { COURTS, HOURS, useFutsal } from "@/data/futsal";

export const Route = createFileRoute("/futsal")({ component: FutsalPage });

const rp = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

function dayOptions() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      key: i === 0 ? "today" : d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }),
    };
  });
}

function FutsalPage() {
  const bookings = useFutsal((s) => s.bookings);
  const book = useFutsal((s) => s.book);
  const cancel = useFutsal((s) => s.cancel);
  const days = useMemo(dayOptions, []);
  const [date, setDate] = useState("today");
  const [pick, setPick] = useState<{ court: string; hour: number } | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void useFutsal.persist.rehydrate();
  }, []);

  const taken = (court: string, hour: number) => bookings.some((b) => b.court === court && b.date === date && b.hour === hour);
  const court = COURTS.find((c) => c.id === pick?.court);
  const mine = bookings.filter((b) => b.date === date).sort((a, b) => a.hour - b.hour);

  function submit() {
    if (!pick || !name.trim() || !phone.trim()) return setMsg("Isi nama dan nomor HP dulu.");
    const ok = book({ court: pick.court, date, hour: pick.hour, name: name.trim(), phone: phone.trim() });
    setMsg(ok ? "Booking tersimpan (data contoh, tersimpan di perangkat ini)." : "Slot baru saja terisi.");
    if (ok) { setPick(null); setName(""); setPhone(""); }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm font-medium tracking-widest text-clay-deep uppercase">Tambahan modul · contoh</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Sewa lapangan futsal</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Pilih tanggal, ketuk slot kosong, isi data. Jadwal 16.00–23.00, satu slot satu jam.
        </p>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => { setDate(d.key); setPick(null); setMsg(""); }}
              className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium ${date === d.key ? "bg-ink text-paper" : "border border-line bg-card text-ink-soft"}`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <section className="space-y-5">
            {COURTS.map((c) => (
              <article key={c.id} className="rounded-lg border border-line bg-card p-4">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl">{c.name}</h2>
                  <p className="text-sm text-muted">{c.surface} · {rp(c.rate)}/jam</p>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {HOURS.map((h) => {
                    const used = taken(c.id, h);
                    const sel = pick?.court === c.id && pick.hour === h;
                    return (
                      <button
                        key={h}
                        disabled={used}
                        onClick={() => { setPick({ court: c.id, hour: h }); setMsg(""); }}
                        className={`rounded-md px-2 py-3 text-sm font-medium ${used ? "bg-paper-2 text-muted line-through" : sel ? "bg-clay text-paper" : "border border-line bg-paper text-ink hover:bg-sand"}`}
                      >
                        {String(h).padStart(2, "0")}.00
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </section>

          <aside className="space-y-4">
            <div className="rounded-lg bg-ink p-5 text-paper">
              <h2 className="font-display text-2xl">Booking</h2>
              {pick && court ? (
                <div className="mt-3 space-y-3 text-sm">
                  <p className="text-sand">{court.name} · {String(pick.hour).padStart(2, "0")}.00 · {rp(court.rate)}</p>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama tim / pemesan" className="w-full rounded-md bg-paper px-3 py-2 text-ink" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nomor HP" inputMode="tel" className="w-full rounded-md bg-paper px-3 py-2 text-ink" />
                  <button onClick={submit} className="w-full rounded-md bg-clay px-4 py-3 font-medium text-paper">Pesan slot</button>
                </div>
              ) : (
                <p className="mt-2 text-sm text-sand">Pilih slot kosong dulu.</p>
              )}
              {msg && <p className="mt-3 text-sm text-sand">{msg}</p>}
            </div>
            <div className="rounded-lg border border-line bg-card p-5">
              <h2 className="font-display text-xl">Terisi hari ini</h2>
              <ul className="mt-2 space-y-2 text-sm">
                {mine.length === 0 && <li className="text-muted">Belum ada booking.</li>}
                {mine.map((b) => (
                  <li key={b.id} className="flex items-center justify-between gap-2 border-b border-line pb-2">
                    <span>{b.court} · {String(b.hour).padStart(2, "0")}.00 · {b.name}</span>
                    <button onClick={() => cancel(b.id)} className="text-xs text-danger underline">batal</button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </Shell>
  );
}
