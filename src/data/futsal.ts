import { create } from "zustand";
import { persist } from "zustand/middleware";

export const COURTS = [
  { id: "A", name: "Lapangan A", surface: "Vinyl", rate: 120_000 },
  { id: "B", name: "Lapangan B", surface: "Sintetis", rate: 100_000 },
];
export const HOURS = [16, 17, 18, 19, 20, 21, 22];

export type Booking = { id: string; court: string; date: string; hour: number; name: string; phone: string };

type FutsalState = {
  bookings: Booking[];
  book: (b: Omit<Booking, "id">) => boolean;
  cancel: (id: string) => void;
};

const seed: Booking[] = [
  { id: "s1", court: "A", date: "today", hour: 19, name: "Tim Garuda", phone: "0812-0000-111" },
  { id: "s2", court: "A", date: "today", hour: 20, name: "FC Cianjur", phone: "0813-0000-222" },
  { id: "s3", court: "B", date: "today", hour: 21, name: "Kantor Pemda", phone: "0856-0000-333" },
];

export const useFutsal = create<FutsalState>()(
  persist(
    (set, get) => ({
      bookings: seed,
      book: (b) => {
        if (get().bookings.some((x) => x.court === b.court && x.date === b.date && x.hour === b.hour)) return false;
        set((s) => ({ bookings: [...s.bookings, { ...b, id: `b-${Date.now()}` }] }));
        return true;
      },
      cancel: (id) => set((s) => ({ bookings: s.bookings.filter((x) => x.id !== id) })),
    }),
    { name: "huni-futsal", skipHydration: true },
  ),
);
