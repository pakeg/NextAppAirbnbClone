import prisma from "../libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return JSON.stringify(listings);
  } catch (error: any) {
    return JSON.stringify([]);
  }
}
