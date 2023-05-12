import { User, Reservation, Listing } from "@prisma/client";

export type SafeUser = Omit<User, "createAt", "updatedAt", "emailVerified"> & {
  createAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
export type SafeListing = Omit<Listing, "createAt"> & {
  createAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createAt",
  "startDate",
  "endDate",
  "listing"
> & {
  createAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
