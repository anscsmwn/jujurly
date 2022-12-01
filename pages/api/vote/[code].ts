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

  // Get Vote by code
  if (req.method === 'GET') {
    const vote = await prisma.votes.findUnique({
      select: {
        id: true,
        publisher: true,
        title: true,
        code: true,
        startDate: true,
        endDate: true,
        candidates: true,
        createAt: true,
        deleteAt: true,
      },
      where: {
        code: code as string,
      },
    });
    // Get Participants of the Vote
    const participants = await prisma.participants.findMany({
      select: {
        candidate: true,
        email: true,
        participateAt: true,
      },
      where: {
        code: code as string,
      },
    });

    // Count Vote of each Candidate
    const candidates = vote?.candidates.map((candidate) => {
      const count = participants.filter(
        (participant) => participant.candidate === candidate.name,
      ).length;
      return {
        ...candidate,
        votes: count,
        totalVotes: participants.length,
        percentage: (count / participants.length) * 100,
      };
    });

    const response = {
      status: vote ? 200 : 404,
      data: {
        ...vote,
        totalVotes: participants.length,
        candidates,
      },
    };
    return res.json(response);
  }
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
  // Update the Vote
  if (req.method === 'PUT') {
    const { title, candidates, startDate, endDate } = req.body;
    const result = await prisma.votes.update({
      where: {
        code: code as string,
      },
      data: {
        title,
        candidates,
        startDate,
        endDate,
      },
    });
    return res.json(result);
  }

  return res.status(200).send('OK');
}
