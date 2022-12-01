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

  const { code } = req.query;
  // Delete the Vote
  if (req.method === 'DELETE') {
    const result = await prisma.votes.update({
      where: {
        code: code as string,
      },
      data: {
        deleteAt: new Date().toString(),
      },
    });
    return res.json(result);
  }

  return res.status(200).send('OK');
}
