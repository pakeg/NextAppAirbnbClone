import prisma from "../libs/prismadb";

type ReqParams = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservation({
  listingId,
  userId,
  authorId,
}: ReqParams) {
  const query: any = {};

  if (listingId) query.listingId = listingId;
  if (userId) query.userId = userId;
  if (authorId) query.listing = { userId: authorId };

  try {
    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });

    const safeReservation = reservation.map((item) => {
      return {
        ...item,
        createAt: item.createAt.toISOString(),
        startDate: item.startDate.toISOString(),
        endDate: item.endDate.toISOString(),
        listing: {
          ...item.listing,
          createAt: item.listing.createAt.toISOString(),
        },
      };
    });

    return JSON.stringify(safeReservation);
  } catch {
    return JSON.stringify([]);
  }
}
