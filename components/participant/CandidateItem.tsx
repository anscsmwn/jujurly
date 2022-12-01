/* eslint-disable no-unused-vars */
import { participants } from '@prisma/client';
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { Candidate } from 'type/types';

interface CandidateItemProps {
  selectedCandidate: string;
  candidate: Candidate;
  participant?: participants;
  handleClick: () => void;
  percentage: number;
}

const CandidateItem = ({
  selectedCandidate,
  candidate,
  handleClick,
  participant,
  percentage,
}: CandidateItemProps) => {
  return (
    <article className="flex border border-zinc-100 sm:p-5 p-2 space-x-4 my-3 rounded-md lg:items-stretch items-start">
      <div className="hidden sm:flex justify-center p-3 rounded-md items-center bg-neutral-100 w-10 h-10">
        <p className="text-lg font-semibold">{candidate.key}</p>
      </div>
      <div className="w-full">
        <p className="text-3xl font-bold">
          <span className="sm:hidden">{candidate.key}. </span>
          {candidate.name}
        </p>
        <p>Kandidat {candidate.key}</p>
        <div className="flex gap-2 items-center">
          <div className="w-full bg-zinc-100 h-2 rounded-full">
            <div
              className="bg-black h-2 rounded-full"
              style={{ width: `${Math.round(percentage)}%` }}
            ></div>
          </div>
          <p className="text-sm">{Math.round(percentage)}%</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        className={`${
          candidate.name === selectedCandidate ||
          participant?.candidate === candidate.name
            ? 'bg-green-600 text-white'
            : 'bg-zinc-100'
        }  sm:w-1/12 justify-center p-3 rounded-md items-center sm:flex`}
      >
        <AiOutlineCheck className="w-7 h-7" />
      </button>
    </article>
  );
};

export default CandidateItem;
