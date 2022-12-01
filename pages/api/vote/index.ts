import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send('Unauthorized');
  }
  // Create vote in database
  if (req.method === 'POST') {
    const { title, candidates, startDate, endDate } = req.body;
    const result = await prisma.votes.create({
      data: {
        title,
        candidates,
        publisher: session?.user?.email!,
        startDate,
        endDate,
        deleteAt: null,
      },
    });
    return res.json(result);
  }
  return res.status(200).send('OK');
}
