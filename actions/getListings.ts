import prisma from "../libs/prismadb";

export interface IgetListingsProps {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathRoomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings({
  userId,
  guestCount,
  roomCount,
  bathRoomCount,
  startDate,
  endDate,
  locationValue,
  category,
}: IgetListingsProps) {
  try {
    let query: any = {};
    if (userId) query.userId = userId;
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (bathRoomCount) query.bathRoomCount = { gte: +bathRoomCount };
    if (locationValue) query.locationValue = locationValue;
    if (startDate && endDate)
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createAt: "desc",
      },
    });

    return JSON.stringify(listings);
  } catch (error: any) {
    return JSON.stringify([]);
  }
}
