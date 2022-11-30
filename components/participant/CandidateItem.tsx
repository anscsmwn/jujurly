/* eslint-disable no-unused-vars */
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { Candidate } from 'type/types';

interface CandidateItemProps {
  selectedCandidate: string;
  setSelectedCandidate: (value: string) => void;
  candidate: Candidate;
}

const CandidateItem = ({
  selectedCandidate,
  setSelectedCandidate,
  candidate,
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
              style={{ width: '40%' }}
            ></div>
          </div>
          <p className="text-sm">40%</p>
        </div>
      </div>
      <button
        onClick={() => {
          setSelectedCandidate(candidate.name);
        }}
        className={` ${
          candidate.name === selectedCandidate
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
