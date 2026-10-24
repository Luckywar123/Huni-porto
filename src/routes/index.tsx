import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Shell } from "@/components/shell";
import { ListingCard } from "@/components/listing-card";
import { cities, listings } from "@/data/listings";

export const Route = createFileRoute("/")({ component: Home });

const steps = [
  { n: "01", title: "Unit dipasang", body: "Foto, harga, fasilitas, dan aturan ditulis sekali. Tidak hilang di riwayat chat." },
  { n: "02", title: "Penyewa menyaring", body: "Kota, jenis sewa, dan batas harga. Yang tidak cocok tidak perlu ditanya ulang." },
  { n: "03", title: "Ajukan sewa", body: "Nama, nomor, dan tanggal masuk masuk ke papan pemilik. Bukan pesan yang tertimbun." },
  { n: "04", title: "Kamar dicatat", body: "Isi, kosong, atau sudah di-booking. Pengelola lihat satu papan, bukan tiga buku." },
];

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [kota, setKota] = useState("semua");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void navigate({ to: "/cari", search: { q, jenis: "semua", kota, max: 5, simpan: false } });
  }

  return (
    <Shell>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-sm font-medium tracking-widest text-clay-deep uppercase">Untuk pemilik, bukan calo</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Kos dan kontrakan yang bisa dilihat sebelum di-chat.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              HUNI adalah website untuk satu pengelola: katalog unit, pengajuan sewa, dan status kamar. Demo ini
              memakai properti contoh di Cianjur, Bandung, dan Depok.
            </p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-lg border border-line bg-card p-3 sm:grid-cols-[1fr_auto_auto]">
              <label className="block">
                <span className="sr-only">Cari nama atau kawasan</span>
                <input
                  value={q}
                  onChange={(event) => setQ(event.target.value)}
                  placeholder="Nama kos atau kawasan"
                  className="w-full rounded-md border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink"
                />
              </label>
              <label className="block">
                <span className="sr-only">Kota</span>
                <select
                  value={kota}
                  onChange={(event) => setKota(event.target.value)}
                  className="h-full w-full rounded-md border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink"
                >
                  <option value="semua">Semua kota</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="rounded-md bg-clay px-5 py-3 font-medium text-paper hover:bg-clay-deep">
                Lihat unit
              </button>
            </form>
          </div>
          <figure className="overflow-hidden rounded-lg border border-line">
            <img src="/media/ext.jpg" alt="Tampak depan kos dua lantai di permukiman, contoh foto listing." className="aspect-[16/10] w-full object-cover" />
            <figcaption className="flex items-center justify-between gap-3 bg-card px-4 py-3 text-sm text-muted">
              <span>Contoh foto tampak depan</span>
              <span>Cianjur</span>
            </figcaption>
          </figure>
        </section>

        <section className="border-y border-line bg-paper-2">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
            {[
              ["6", "Unit contoh"],
              ["3", "Kota"],
              ["12", "Kamar di papan pemilik"],
              ["0", "Akun yang diminta"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl text-ink">{value}</dt>
                <dd className="mt-1 text-sm text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-ink">Unit yang sedang dipajang</h2>
              <p className="mt-2 text-muted">Campuran kos bulanan dan kontrakan tahunan.</p>
            </div>
            <Link to="/cari" search={{ q: "", jenis: "semua", kota: "semua", max: 5, simpan: false }} className="hidden text-sm font-medium text-clay-deep underline decoration-clay underline-offset-4 sm:inline">
              Semua unit
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.slice(0, 3).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <section className="bg-ink text-paper">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl">Dari kosong sampai tercatat</h2>
              <p className="mt-3 text-sand">Empat langkah yang sama untuk kos kamar maupun rumah kontrakan.</p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <li key={step.n} className="rounded-lg border border-ink-soft bg-ink-soft/30 p-4">
                  <p className="font-display text-clay">{step.n}</p>
                  <h3 className="mt-2 font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-sand">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-2">
          <article className="overflow-hidden rounded-lg border border-line bg-card">
            <img src="/media/room-bandung.jpg" alt="" className="aspect-[16/8] w-full object-cover" />
            <div className="p-5">
              <h2 className="font-display text-2xl">Kos</h2>
              <p className="mt-2 text-ink-soft">
                Disewa per kamar, per bulan. Yang dijual adalah ketersediaan, aturan tamu, dan fasilitas yang
                benar-benar ada — bukan caption “full furnis” di status.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg border border-line bg-card">
            <img src="/media/hills.jpg" alt="" className="aspect-[16/8] w-full object-cover" />
            <div className="p-5">
              <h2 className="font-display text-2xl">Kontrakan</h2>
              <p className="mt-2 text-ink-soft">
                Disewa per rumah, biasanya minimal setahun. Halaman yang sama menampilkan luas, isi perabot, dan
                syarat kontrak supaya survei tidak dimulai dari nol.
              </p>
            </div>
          </article>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-4">
          <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-moss px-6 py-8 text-paper sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl">Papan untuk yang megang kunci</h2>
              <p className="mt-2 max-w-xl text-sand">
                Ubah kamar dari isi ke kosong, lalu lihat pengajuan yang masuk dari halaman unit.
              </p>
            </div>
            <Link to="/pemilik" className="rounded-md bg-paper px-5 py-3 font-medium text-moss-deep">
              Buka papan pemilik
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
