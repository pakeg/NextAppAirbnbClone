import { NextApiRequest, NextApiResponse } from "next";
import getCurrentUser from "../../../actions/getCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser(req, res);
  return res.status(200).json(currentUser);
}
