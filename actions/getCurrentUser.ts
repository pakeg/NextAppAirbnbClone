import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/authOptions";
import prisma from "../libs/prismadb";

export default async function getCurrentUser(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
