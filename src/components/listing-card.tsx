import { Link } from "@tanstack/react-router";
import { genderLabel, kindLabel, rupiahShort, type Listing } from "@/data/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to="/unit/$id"
      params={{ id: listing.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-card transition-colors hover:border-ink"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={listing.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="absolute top-3 left-3 rounded-sm bg-paper px-2 py-1 text-xs font-medium tracking-wide text-ink uppercase">
          {kindLabel(listing.kind)} · {genderLabel(listing.gender)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight text-ink">{listing.name}</h3>
          <p className="shrink-0 text-right text-sm font-semibold text-clay-deep">
            {rupiahShort(listing.price)}
            <span className="block font-normal text-muted">/bulan</span>
          </p>
        </div>
        <p className="text-sm text-muted">
          {listing.area}, {listing.city}
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">{listing.blurb}</p>
        <p className="mt-auto pt-2 text-sm text-moss">
          {listing.roomsAvailable} dari {listing.roomsTotal} unit kosong · {listing.size}
        </p>
      </div>
    </Link>
  );
}
