import { NextApiRequest, NextApiResponse } from "next";
import getCurrentUser from "../../../actions/getCurrentUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser(req, res);
  if (!currentUser) {
    return res.status(401).json({ message: "user not found" });
  }

  if (req.method === "POST") {
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathRoomCount,
      guestCount,
      location,
      price,
    } = req.body;

    try {
      const listing = await prisma.listing.create({
        data: {
          title,
          description,
          imageSrc,
          category,
          roomCount,
          bathRoomCount,
          guestCount,
          locationValue: location.value,
          userId: currentUser.id,
          price: parseInt(price, 10),
        },
      });
      return res.status(200).json(listing);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create listing" });
    }
  } else if (req.method === "DELETE") {
    const { listingId } = req.body;

    if (!listingId || typeof listingId !== "string") {
      res.status(406).json({ message: "invalid parameters" });
    }

    try {
      const deleteListing = await prisma.listing.deleteMany({
        where: {
          id: listingId,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(deleteListing);
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete listing." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
