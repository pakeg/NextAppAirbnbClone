import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListing(req, res) {
  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites.map((item) => {
      return { ...item, createAt: item.createAt.toISOString() };
    });
  } catch {
    return [];
  }
}
