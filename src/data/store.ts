import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Inquiry = {
  id: string;
  listingId: string;
  listingName: string;
  name: string;
  phone: string;
  moveIn: string;
  note: string;
  createdAt: string;
};

export type RoomStatus = "isi" | "kosong" | "booking";

const ROOM_IDS = Array.from({ length: 12 }, (_, index) => `M${String(index + 1).padStart(2, "0")}`);

const seedRooms: Record<string, RoomStatus> = Object.fromEntries(
  ROOM_IDS.map((id, index) => {
    if (index < 7) return [id, "isi"];
    if (index === 7) return [id, "booking"];
    return [id, "kosong"];
  }),
);

const seedInquiries: Inquiry[] = [
  {
    id: "seed-1",
    listingId: "melati",
    listingName: "Kos Melati",
    name: "Sari Wulandari",
    phone: "0812-1000-221",
    moveIn: "2026-11-01",
    note: "Butuh kamar lantai 1, bawa satu koper.",
    createdAt: "2026-10-18T09:12:00.000Z",
  },
  {
    id: "seed-2",
    listingId: "melati",
    listingName: "Kos Melati",
    name: "Intan Puspita",
    phone: "0813-4400-908",
    moveIn: "2026-11-15",
    note: "Tanya apakah listrik termasuk sewa.",
    createdAt: "2026-10-21T14:40:00.000Z",
  },
];

type HuniState = {
  saved: string[];
  inquiries: Inquiry[];
  rooms: Record<string, RoomStatus>;
  toggleSaved: (id: string) => void;
  addInquiry: (input: Omit<Inquiry, "id" | "createdAt">) => void;
  cycleRoom: (id: string) => void;
};

export const ROOM_ORDER = ROOM_IDS;

export const useHuni = create<HuniState>()(
  persist(
    (set) => ({
      saved: [],
      inquiries: seedInquiries,
      rooms: seedRooms,
      toggleSaved: (id) =>
        set((state) => ({
          saved: state.saved.includes(id) ? state.saved.filter((item) => item !== id) : [...state.saved, id],
        })),
      addInquiry: (input) =>
        set((state) => ({
          inquiries: [
            {
              ...input,
              id: `inq-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
            ...state.inquiries,
          ],
        })),
      cycleRoom: (id) =>
        set((state) => {
          const current = state.rooms[id] ?? "kosong";
          const next: RoomStatus = current === "isi" ? "kosong" : current === "kosong" ? "booking" : "isi";
          return { rooms: { ...state.rooms, [id]: next } };
        }),
    }),
    {
      name: "huni-poc",
      skipHydration: true,
    },
  ),
);
