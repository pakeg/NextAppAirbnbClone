import bcrypt from "bcrypt";
import prisma from "../../../libs/prismadb";

export default async function POST(request: Request, response: Response) {
  const body = request.body;
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return response.status(200).json(user);
}
