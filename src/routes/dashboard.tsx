import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Shell } from "@/components/shell";
import { pnlRows } from "@/data/pnl";
import {
  HPP_TARGET, KOLS, MENUS, MONTHLY, PAYMENTS, ROLES, TAB_LABEL, UNITS, consumeFifo, menuCost, seedBatches, stockOf,
  type Batch, type Role, type Tab,
} from "@/data/dashboard";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

const rp = (n: number) => `Rp${Math.round(n).toLocaleString("id-ID")}`;
const pct = (n: number) => `${(n * 100).toFixed(1).replace(".", ",")}%`;
const card = "rounded-lg border border-line bg-card p-4";
const th = "py-2 pr-3 text-left font-medium text-muted";

type Sale = { id: string; menu: string; pay: string; total: number; hpp: number };

function DashboardPage() {
  const [role, setRole] = useState<Role>("admin");
  const [tab, setTab] = useState<Tab | null>(null);
  const [batches, setBatches] = useState<Batch[]>(seedBatches);
  const [sales, setSales] = useState<Sale[]>([
    { id: "s1", menu: "Americano", pay: "QRIS", total: 18_000, hpp: 5_040 },
    { id: "s2", menu: "Ayam Geprek + Nasi", pay: "Tunai", total: 28_000, hpp: 8_550 },
  ]);
  const [pay, setPay] = useState("QRIS");
  const [msg, setMsg] = useState("");
  const [buy, setBuy] = useState({ item: "kopi", qty: 1000, cost: 300 });

  const tabs = ROLES[role].tabs;
  const active: Tab = tab && tabs.includes(tab) ? tab : tabs[0];
  const omzet = sales.reduce((s, x) => s + x.total, 0);
  const hpp = sales.reduce((s, x) => s + x.hpp, 0);

  function sell(menuId: string) {
    const m = MENUS.find((x) => x.id === menuId)!;
    let cur = batches;
    let cost = 0;
    for (const [item, qty] of Object.entries(m.recipe)) {
      if (stockOf(cur, item) < qty) return setMsg(`Stok ${item} kurang untuk ${m.name}.`);
      const r = consumeFifo(cur, item, qty);
      cur = r.next;
      cost += r.cost;
    }
    setBatches(cur);
    setSales([{ id: `s-${Date.now()}`, menu: m.name, pay, total: m.price, hpp: cost }, ...sales]);
    setMsg(`${m.name} terjual. Bahan terpotong dari batch tertua, HPP ${rp(cost)}.`);
  }

  function addBatch() {
    if (buy.qty <= 0 || buy.cost <= 0) return setMsg("Isi jumlah dan harga lebih dari nol.");
    setBatches([...batches, { id: `p-${Date.now()}`, item: buy.item, date: new Date().toISOString().slice(0, 10), qty: buy.qty, cost: buy.cost }]);
    setMsg(`Batch ${buy.item} masuk: ${buy.qty.toLocaleString("id-ID")} ${UNITS[buy.item]} @ ${rp(buy.cost)}.`);
  }

  const lunas = PAYMENTS.filter((p) => p.status === "Lunas").reduce((s, p) => s + p.amount, 0);
  const tagihan = PAYMENTS.reduce((s, p) => s + p.amount, 0);

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm font-medium tracking-widest text-clay-deep uppercase">Dashboard analytics · contoh</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Satu layar per peran</h1>
        <p className="mt-2 max-w-3xl text-ink-soft">
          Admin melihat semua modul, peran lain hanya modul kerjanya. Data contoh, belum terhubung ke POS. Coba jual menu
          di tab Penjualan dan lihat stok di Gudang terpotong FIFO.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(Object.keys(ROLES) as Role[]).map((r) => (
            <button key={r} onClick={() => { setRole(r); setTab(null); }} className={`rounded-md px-4 py-2 text-sm font-medium ${role === r ? "bg-ink text-paper" : "border border-line bg-card text-ink-soft"}`}>
              {ROLES[r].label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto border-b border-line pb-2">
          {tabs.map((t) => (
            <button key={t} onClick={() => { setTab(t); setMsg(""); }} className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium ${active === t ? "bg-moss text-paper" : "text-ink-soft hover:bg-paper-2"}`}>
              {TAB_LABEL[t]}
            </button>
          ))}
        </div>
        {msg && <p className="mt-3 rounded-md bg-sand px-3 py-2 text-sm text-ink">{msg}</p>}

        {active === "ringkasan" && (
          <section className="mt-6 space-y-6">
            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Hunian kos", "16 / 20 unit (80%)"],
                ["Omzet cafe (target)", rp(pnlRows[0].gross)],
                ["Sewa kos (hunian 80%)", rp(35_520_000)],
                ["Futsal (realistis)", rp(pnlRows[2].gross)],
              ].map(([k, v]) => (
                <div key={k} className={card}><dt className="text-sm text-muted">{k}</dt><dd className="mt-1 font-display text-2xl">{v}</dd></div>
              ))}
            </dl>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className={card}>
                <h2 className="font-display text-2xl">Hunian kos (%)</h2>
                <div className="mt-3 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MONTHLY}><XAxis dataKey="bulan" tickLine={false} axisLine={false} /><YAxis domain={[0, 100]} width={32} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="hunian" name="Terisi %" fill="#2f5d50" radius={[6, 6, 0, 0]} /></BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={card}>
                <h2 className="font-display text-2xl">Pendapatan cafe vs kos (jt)</h2>
                <div className="mt-3 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MONTHLY}><XAxis dataKey="bulan" tickLine={false} axisLine={false} /><YAxis width={32} tickLine={false} axisLine={false} /><Tooltip /><Legend /><Bar dataKey="cafe" name="Cafe" fill="#c4622d" radius={[6, 6, 0, 0]} /><Bar dataKey="kos" name="Kos" fill="#2f5d50" radius={[6, 6, 0, 0]} /></BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        )}

        {active === "pembayaran" && (
          <section className={`${card} mt-6 overflow-x-auto`}>
            <h2 className="font-display text-2xl">Tagihan sewa kos</h2>
            <p className="text-sm text-muted">Terbayar {rp(lunas)} dari {rp(tagihan)} pada contoh ini. Metode: transfer, QRIS, tunai.</p>
            <table className="mt-3 w-full min-w-[34rem] text-sm">
              <thead><tr><th className={th}>Unit</th><th className={th}>Penghuni</th><th className={th}>Jatuh tempo</th><th className={th}>Nominal</th><th className={th}>Metode</th><th className={th}>Status</th></tr></thead>
              <tbody>
                {PAYMENTS.map((p) => (
                  <tr key={p.unit} className="border-t border-line">
                    <td className="py-2 pr-3">{p.unit}</td><td className="pr-3">{p.name}</td><td className="pr-3">{p.due}</td><td className="pr-3">{rp(p.amount)}</td><td className="pr-3">{p.method}</td>
                    <td><span className={`rounded px-2 py-1 text-xs ${p.status === "Lunas" ? "bg-moss text-paper" : p.status === "Telat" ? "bg-clay text-paper" : "bg-paper-2"}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {active === "penjualan" && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className={card}>
              <h2 className="font-display text-2xl">Kasir cafe</h2>
              <label className="mt-3 block text-sm text-muted">Pembayaran
                <select value={pay} onChange={(e) => setPay(e.target.value)} className="ml-2 rounded-md border border-line bg-paper px-2 py-1 text-ink">
                  <option>QRIS</option><option>Tunai</option><option>Transfer</option>
                </select>
              </label>
              <div className="mt-3 grid gap-2">
                {MENUS.map((m) => (
                  <button key={m.id} onClick={() => sell(m.id)} className="flex justify-between rounded-md border border-line bg-paper px-3 py-3 text-left hover:bg-sand">
                    <span>{m.name}</span><span className="font-medium">{rp(m.price)}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className={card}>
              <h2 className="font-display text-2xl">Penjualan hari ini</h2>
              <p className="text-sm text-muted">Omzet {rp(omzet)} · HPP {rp(hpp)} ({omzet ? pct(hpp / omzet) : "0%"}) · target {pct(HPP_TARGET)}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {sales.map((s) => (
                  <li key={s.id} className="flex justify-between border-b border-line pb-2"><span>{s.menu} · {s.pay}</span><span>{rp(s.total)}</span></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {active === "gudang" && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className={`${card} overflow-x-auto`}>
              <h2 className="font-display text-2xl">Stok per batch (FIFO)</h2>
              <p className="text-sm text-muted">Batch tertua dipakai dulu. Batch habis hilang dari daftar.</p>
              <table className="mt-3 w-full min-w-[28rem] text-sm">
                <thead><tr><th className={th}>Bahan</th><th className={th}>Masuk</th><th className={th}>Sisa</th><th className={th}>Harga / unit</th></tr></thead>
                <tbody>
                  {[...batches].filter((b) => b.qty > 0).sort((a, b) => a.item.localeCompare(b.item) || a.date.localeCompare(b.date)).map((b) => (
                    <tr key={b.id} className="border-t border-line">
                      <td className="py-2 capitalize">{b.item}</td><td>{b.date}</td><td>{b.qty.toLocaleString("id-ID")} {UNITS[b.item]}</td><td>{rp(b.cost)}/{UNITS[b.item]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={card}>
              <h2 className="font-display text-2xl">Catat pembelian</h2>
              <div className="mt-3 space-y-2 text-sm">
                <select value={buy.item} onChange={(e) => setBuy({ ...buy, item: e.target.value })} className="w-full rounded-md border border-line bg-paper px-3 py-2">
                  {Object.keys(UNITS).map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
                <input type="number" value={buy.qty} onChange={(e) => setBuy({ ...buy, qty: +e.target.value })} className="w-full rounded-md border border-line bg-paper px-3 py-2" aria-label={`Jumlah (${UNITS[buy.item]})`} />
                <input type="number" value={buy.cost} onChange={(e) => setBuy({ ...buy, cost: +e.target.value })} className="w-full rounded-md border border-line bg-paper px-3 py-2" aria-label="Harga per unit" />
                <button onClick={addBatch} className="w-full rounded-md bg-clay px-4 py-3 font-medium text-paper">Masukkan batch</button>
              </div>
            </div>
          </section>
        )}

        {active === "marketing" && (
          <section className={`${card} mt-6 overflow-x-auto`}>
            <h2 className="font-display text-2xl">KOL dan influencer</h2>
            <p className="text-sm text-muted">Tiap KOL punya kode promo. ROI = omzet dari kode ÷ fee.</p>
            <table className="mt-3 w-full min-w-[36rem] text-sm">
              <thead><tr><th className={th}>KOL</th><th className={th}>Unit</th><th className={th}>Fee</th><th className={th}>Kode</th><th className={th}>Redeem</th><th className={th}>Omzet</th><th className={th}>ROI</th></tr></thead>
              <tbody>
                {KOLS.map((k) => (
                  <tr key={k.code} className="border-t border-line">
                    <td className="py-2 pr-3">{k.name}<span className="block text-xs text-muted">{k.platform}</span></td><td className="pr-3">{k.unit}</td><td className="pr-3">{rp(k.fee)}</td><td className="pr-3">{k.code}</td><td className="pr-3">{k.redeem}</td><td className="pr-3">{rp(k.omzet)}</td><td className="font-medium">{(k.omzet / k.fee).toFixed(1).replace(".", ",")}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {active === "rnd" && (
          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            {MENUS.map((m) => {
              const c = menuCost(batches, m.recipe);
              const over = c / m.price > HPP_TARGET;
              return (
                <article key={m.id} className={`${card} ${over ? "border-2 border-clay" : ""}`}>
                  <h2 className="font-display text-2xl">{m.name}</h2>
                  <table className="mt-3 w-full text-sm">
                    <tbody>
                      {Object.entries(m.recipe).map(([item, qty]) => (
                        <tr key={item} className="border-t border-line"><td className="py-1 capitalize">{item} {qty} {UNITS[item]}</td><td className="text-right">{rp(consumeFifo(batches, item, qty).cost)}</td></tr>
                      ))}
                      <tr className="border-t border-line font-medium"><td className="py-1">HPP</td><td className="text-right">{rp(c)} ({pct(c / m.price)})</td></tr>
                      <tr><td className="py-1">Harga jual</td><td className="text-right">{rp(m.price)}</td></tr>
                      <tr><td className="py-1">Margin</td><td className="text-right">{rp(m.price - c)}</td></tr>
                    </tbody>
                  </table>
                  {over && <p className="mt-2 text-sm text-clay-deep">Di atas target {pct(HPP_TARGET)}. Harga pas di target: {rp(c / HPP_TARGET)}.</p>}
                </article>
              );
            })}
          </section>
        )}
      </main>
    </Shell>
  );
}
