import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Shell } from "@/components/shell";
import { genderLabel, kindLabel, listingById, listings, rupiah } from "@/data/listings";
import { useHuni } from "@/data/store";

export const Route = createFileRoute("/unit/$id")({
  component: UnitPage,
});

function UnitPage() {
  const { id } = Route.useParams();
  const listing = listingById(id);
  const saved = useHuni((state) => state.saved);
  const toggleSaved = useHuni((state) => state.toggleSaved);
  const addInquiry = useHuni((state) => state.addInquiry);
  const [photo, setPhoto] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void useHuni.persist.rehydrate();
  }, []);

  useEffect(() => {
    setPhoto(0);
    setSent(false);
  }, [id]);

  if (!listing) {
    return (
      <Shell>
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="font-display text-4xl">Unit tidak ada</h1>
          <p className="mt-3 text-muted">ID ini tidak ada di data contoh.</p>
          <Link to="/cari" search={{ q: "", jenis: "semua", kota: "semua", max: 5, simpan: false }} className="mt-6 inline-block rounded-md bg-clay px-4 py-3 text-paper">
            Kembali ke katalog
          </Link>
        </main>
      </Shell>
    );
  }

  const unit = listing;
  const isSaved = saved.includes(unit.id);
  const others = listings.filter((item) => item.id !== unit.id).slice(0, 2);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const moveIn = String(form.get("moveIn") ?? "");
    const note = String(form.get("note") ?? "").trim();
    if (name.length < 3) {
      setError("Nama minimal 3 huruf.");
      return;
    }
    if (!/^0\d{8,13}$/.test(phone.replace(/[\s-]/g, ""))) {
      setError("Nomor HP diawali 0, 9–14 digit.");
      return;
    }
    if (!moveIn) {
      setError("Isi tanggal masuk.");
      return;
    }
    setError("");
    addInquiry({
      listingId: unit.id,
      listingName: unit.name,
      name,
      phone,
      moveIn,
      note: note || "Tanpa catatan",
    });
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm text-muted">
          <Link to="/cari" search={{ q: "", jenis: "semua", kota: "semua", max: 5, simpan: false }} className="underline decoration-line underline-offset-4">
            Katalog
          </Link>
          <span> / {listing.area}</span>
        </p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-clay-deep uppercase">
              {kindLabel(listing.kind)} · {genderLabel(listing.gender)}
            </p>
            <h1 className="mt-1 font-display text-4xl text-ink">{listing.name}</h1>
            <p className="mt-1 text-muted">
              {listing.area}, {listing.city}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-display text-3xl text-ink">{rupiah(listing.price)}</p>
            <p className="text-sm text-muted">per bulan · minimal {listing.minStay}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <img src={listing.gallery[photo]} alt="" className="aspect-[4/3] w-full rounded-lg border border-line object-cover" />
            <div className="mt-3 flex gap-2">
              {listing.gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhoto(index)}
                  className={index === photo ? "overflow-hidden rounded-md ring-2 ring-ink" : "overflow-hidden rounded-md ring-1 ring-line"}
                >
                  <img src={src} alt="" className="h-16 w-20 object-cover" />
                </button>
              ))}
            </div>

            <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">{listing.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["Ukuran", listing.size],
                ["Kosong", `${listing.roomsAvailable} / ${listing.roomsTotal}`],
                ["Isi", listing.furnished],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-line bg-card p-3">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-8 font-display text-2xl">Fasilitas</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {listing.facilities.map((item) => (
                <li key={item} className="rounded-sm bg-paper-2 px-3 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-display text-2xl">Aturan</h2>
            <ul className="mt-3 space-y-2 text-ink-soft">
              {listing.rules.map((rule) => (
                <li key={rule} className="border-l-2 border-clay pl-3">
                  {rule}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-display text-2xl">Di sekitar</h2>
            <ul className="mt-3 space-y-1 text-ink-soft">
              {listing.near.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-lg border border-line bg-card p-5 lg:sticky lg:top-20">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl">Ajukan sewa</h2>
              <button type="button" onClick={() => toggleSaved(listing.id)} className="rounded-md border border-line px-3 py-2 text-sm">
                {isSaved ? "Tersimpan" : "Simpan"}
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Di demo ini pengajuan hanya tersimpan di peramban, lalu muncul di papan pemilik. Tidak ada WhatsApp
              sungguhan.
            </p>
            {sent ? (
              <div className="mt-4 rounded-md bg-moss px-4 py-4 text-paper">
                <p className="font-medium">Pengajuan tercatat.</p>
                <p className="mt-1 text-sm text-sand">Buka papan pemilik untuk melihatnya di daftar masuk.</p>
                <Link to="/pemilik" className="mt-3 inline-block text-sm underline underline-offset-4">
                  Ke papan pemilik
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                <label className="text-sm">
                  Nama
                  <input name="name" required className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink" />
                </label>
                <label className="text-sm">
                  Nomor HP
                  <input name="phone" inputMode="tel" placeholder="08…" required className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink" />
                </label>
                <label className="text-sm">
                  Rencana masuk
                  <input name="moveIn" type="date" required className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink" />
                </label>
                <label className="text-sm">
                  Catatan
                  <textarea name="note" rows={3} className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-3 outline-none focus:border-ink" />
                </label>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <button type="submit" className="rounded-md bg-clay px-4 py-3 font-medium text-paper hover:bg-clay-deep">
                  Kirim pengajuan
                </button>
              </form>
            )}
          </aside>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl">Unit lain</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((item) => (
              <Link key={item.id} to="/unit/$id" params={{ id: item.id }} className="flex gap-3 rounded-lg border border-line bg-card p-3">
                <img src={item.image} alt="" className="h-20 w-24 rounded-md object-cover" />
                <span>
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-sm text-muted">
                    {item.city} · {rupiah(item.price)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
