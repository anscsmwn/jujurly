import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send('Unauthorized');
  }
  // Create vote in database
  if (req.method === 'POST') {
    const { title, candidates, startDate, endDate, code } = req.body;
    const result = await prisma.votes.create({
      data: {
        title,
        candidates,
        publisher: session?.user?.email!,
        startDate,
        endDate,
        deleteAt: null,
        //@ts-ignore
        code,
      },
    });
    return res.json(result);
  }
  if (req.method === 'GET') {
    const result = await prisma.votes.findMany({
      where: {
        AND: [{ deleteAt: null }, { publisher: session?.user?.email! }],
      },
    });
    const response = {
      status: 200,
      data: result,
    };
    return res.json(response);
  }
  return res.status(200).send('OK');
}
