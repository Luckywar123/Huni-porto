import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { Shell } from "@/components/shell";
import { ListingCard } from "@/components/listing-card";
import { cities, listings, rupiahShort } from "@/data/listings";
import { useHuni } from "@/data/store";

type Search = {
  q: string;
  jenis: "semua" | "kos" | "kontrakan";
  kota: string;
  max: number;
  simpan: boolean;
};

export const Route = createFileRoute("/cari")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
    jenis: search.jenis === "kos" || search.jenis === "kontrakan" ? search.jenis : "semua",
    kota: typeof search.kota === "string" ? search.kota : "semua",
    max: Number(search.max) === 2 || Number(search.max) === 3 ? Number(search.max) : 5,
    simpan: search.simpan === true || search.simpan === "true",
  }),
  component: CariPage,
});

const caps = [
  { value: 2, label: "≤ Rp2 jt" },
  { value: 3, label: "≤ Rp3 jt" },
  { value: 5, label: "Semua harga" },
] as const;

function CariPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/cari" });
  const saved = useHuni((state) => state.saved);

  useEffect(() => {
    void useHuni.persist.rehydrate();
  }, []);

  const result = useMemo(() => {
    const query = search.q.trim().toLowerCase();
    return listings.filter((listing) => {
      if (search.jenis !== "semua" && listing.kind !== search.jenis) return false;
      if (search.kota !== "semua" && listing.city !== search.kota) return false;
      if (listing.price > search.max * 1_000_000) return false;
      if (search.simpan && !saved.includes(listing.id)) return false;
      if (!query) return true;
      const haystack = `${listing.name} ${listing.area} ${listing.city} ${listing.blurb}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [search, saved]);

  function patch(next: Partial<Search>) {
    void navigate({ search: { ...search, ...next } });
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-display text-4xl text-ink">Cari unit</h1>
        <p className="mt-2 text-muted">Enam listing contoh. Filter tidak memanggil server.</p>

        <div className="mt-6 grid gap-3 rounded-lg border border-line bg-card p-4 lg:grid-cols-4">
          <label className="block text-sm">
            <span className="text-muted">Kata</span>
            <input
              value={search.q}
              onChange={(event) => patch({ q: event.target.value })}
              className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
              placeholder="Melati, Dago, Bojong"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">Jenis</span>
            <select
              value={search.jenis}
              onChange={(event) => patch({ jenis: event.target.value as Search["jenis"] })}
              className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
            >
              <option value="semua">Kos dan kontrakan</option>
              <option value="kos">Kos</option>
              <option value="kontrakan">Kontrakan</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-muted">Kota</span>
            <select
              value={search.kota}
              onChange={(event) => patch({ kota: event.target.value })}
              className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
            >
              <option value="semua">Semua</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-muted">Batas harga</span>
            <select
              value={search.max}
              onChange={(event) => patch({ max: Number(event.target.value) })}
              className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
            >
              {caps.map((cap) => (
                <option key={cap.value} value={cap.value}>
                  {cap.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {result.length} unit
            {search.max < 5 ? ` · ${rupiahShort(search.max * 1_000_000)} ke bawah` : ""}
          </p>
          <button
            type="button"
            onClick={() => patch({ simpan: !search.simpan })}
            className={
              search.simpan
                ? "rounded-md bg-ink px-4 py-2 text-sm text-paper"
                : "rounded-md border border-line bg-card px-4 py-2 text-sm text-ink"
            }
          >
            {search.simpan ? "Menampilkan yang disimpan" : "Hanya yang disimpan"}
          </button>
        </div>

        {result.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-line bg-card px-5 py-10 text-center">
            <p className="font-display text-2xl">Tidak ada yang cocok</p>
            <p className="mt-2 text-muted">Longgarkan harga, atau matikan filter simpan.</p>
            <button
              type="button"
              onClick={() => patch({ q: "", jenis: "semua", kota: "semua", max: 5, simpan: false })}
              className="mt-4 rounded-md bg-clay px-4 py-3 text-paper"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </Shell>
  );
}
