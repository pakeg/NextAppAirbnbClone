import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "../../../../actions/getCurrentUser";

const prisma = new PrismaClient();

type IParams = {
  listingId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser(req, res);
  if (!currentUser) {
    return res.status(401).json({ message: "user not found" });
  }
  const { listingId }: IParams = req.query;

  if (!listingId || typeof listingId !== "string") {
    return res.status(406).json({ message: "invalid parametrs" });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  if (req.method === "POST") {
    favoriteIds.push(listingId);
    try {
      const userUpdate = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          favoriteIds,
        },
      });
      res.status(200).json(userUpdate);
    } catch (error) {
      return res.status(500).json({ message: "Failed to add favorite" });
    }
  } else if (req.method === "DELETE") {
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    try {
      const userUpdate = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          favoriteIds,
        },
      });
      res.status(200).json(userUpdate);
    } catch (error) {
      return res.status(500).json({ message: "Failed to remove favorite" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
