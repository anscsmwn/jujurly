import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }
  const { code } = req.query;

  // Get Participant Details
  if (req.method === 'GET') {
    const result = await prisma.participants.findFirst({
      where: {
        code: code as string,
        email: session.user?.email!,
      },
    });
    const response = {
      status: 200,
      data: result,
    };
    return res.status(200).json(response);
  }

  // Add Participant
  if (req.method === 'POST') {
    const result = await prisma.participants.create({
      data: {
        candidate: req.body.candidate,
        email: session.user?.email!,
        code: code as string,
      },
    });
    return res.json(result);
  }

  return res.json({
    message: 'Method not allowed',
  });
}
