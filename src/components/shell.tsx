import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function Ribbon() {
  return (
    <div className="bg-ink text-paper">
      <p className="mx-auto max-w-6xl px-4 py-2 text-center text-sm leading-snug">
        Proof of concept · data contoh Cianjur, Bandung, dan Depok · bukan iklan sungguhan
      </p>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none tracking-tight text-ink">HUNI</span>
          <span className="hidden text-sm text-muted sm:inline">Kos & kontrakan</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/cari"
            search={{ q: "", jenis: "semua", kota: "semua", max: 5, simpan: false }}
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-2"
            activeProps={{ className: "rounded-md bg-paper-2 px-3 py-2 text-sm font-medium text-ink" }}
          >
            Cari
          </Link>
          <Link
            to="/pemilik"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-2"
            activeProps={{ className: "rounded-md bg-paper-2 px-3 py-2 text-sm font-medium text-ink" }}
          >
            Pemilik
          </Link>
          <Link
            to="/futsal"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-2"
            activeProps={{ className: "rounded-md bg-paper-2 px-3 py-2 text-sm font-medium text-ink" }}
          >
            Futsal
          </Link>
          <Link
            to="/proposal"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-2"
            activeProps={{ className: "rounded-md bg-paper-2 px-3 py-2 text-sm font-medium text-ink" }}
          >
            Kerja sama
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl">HUNI</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-sand">
            Website untuk pemilik kos dan kontrakan: unit terlihat jelas, penyewa mengajukan sewa, kamar
            tercatat.
          </p>
        </div>
        <div className="text-sm text-sand">
          <p className="font-medium text-paper">Di demo ini</p>
          <ul className="mt-2 space-y-1">
            <li>Enam unit contoh</li>
            <li>Filter kota, jenis, harga</li>
            <li>Ajukan sewa tersimpan di perangkat</li>
            <li>Papan 12 kamar bisa diubah</li>
          </ul>
        </div>
        <div className="text-sm text-sand">
          <p className="font-medium text-paper">Proposal</p>
          <a href="/pitch/HUNI-Pitch-Deck-Lengkap.pptx" className="mt-2 inline-block underline decoration-clay underline-offset-4">
            Unduh pitch deck
          </a>
          <p className="mt-3">Model bagi hasil, rincian kos, futsal, dan cafe ada di berkas itu.</p>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Ribbon />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
