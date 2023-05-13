import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "../../../actions/getCurrentUser";

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
    const { totalPrice, startDate, endDate, listingId } = req.body;
    if (!totalPrice || !startDate || !endDate || !listingId) {
      res.status(406).json({ message: "invalid parameters" });
    }

    try {
      const listingReservation = await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: {
          reservations: {
            create: {
              userId: currentUser.id,
              startDate,
              endDate,
              totalPrice,
            },
          },
        },
      });

      return res.status(200).json(listingReservation);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create listing reservation." });
    }
  } else if (req.method === "DELETE") {
    const { reservationId } = req.body;

    if (!reservationId || typeof reservationId !== "string") {
      res.status(406).json({ message: "invalid parameters" });
    }

    try {
      const deleteReservation = await prisma.reservation.deleteMany({
        where: {
          id: reservationId,
          OR: [
            {
              userId: currentUser.id,
            },
            { listing: { userId: currentUser.id } },
          ],
        },
      });

      return res.status(200).json(deleteReservation);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete listing reservation." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
