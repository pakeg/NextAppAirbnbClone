import prisma from "../libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(id: IParams) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return JSON.stringify({
      ...listing,
      createAt: listing.createAt.toISOString(),
      user: {
        ...listing.user,
        createAt: listing.user.createAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    });
  } catch (error: any) {
    return null;
  }
}
