import prisma from "../libs/prismadb";

export interface IgetListingsProps {
  userId?: string;
}

export default async function getListings(userId: IgetListingsProps) {
  try {
    let query: any = {};
    if (userId) query.userId = userId;

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
