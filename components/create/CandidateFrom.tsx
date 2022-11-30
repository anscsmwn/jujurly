import { useCreateVoteStore } from '#/createVoteStore';
import React from 'react';
import { Candidate } from 'type/types';
import InputForm from './InputForm';
import { FiTrash2 } from 'react-icons/fi';

interface CandidateFormProps {
  candidate: Candidate;
}

const CandidateForm = ({ candidate }: CandidateFormProps) => {
  const changeCandidate = useCreateVoteStore((state) => state.changeCandidate);
  const removeCandidate = useCreateVoteStore((state) => state.removeCandidate);
  const candidates = useCreateVoteStore((state) => state.candidates);
  return (
    <div className="p-5 rounded-sm border-zinc-100 border flex flex-col items-center relative">
      <button
        onClick={() => {
          removeCandidate(candidate.key);
        }}
        type="button"
        className="absolute p-2 rounded-full hover:bg-zinc-100 top-1 right-1"
      >
        <FiTrash2 className="text-neutral-500" />
      </button>
      <h4 className="flex w-1/2 bg-zinc-100 aspect-square text-center self-center items-center justify-center text-4xl rounded-full">
        {candidate.key}
      </h4>
      <p className="mt-2 mb-1 text-sm sm:text-base">Nama Kandidat</p>
      <InputForm
        className="w-full max-w-md"
        placeHolder="Masukan nama kandidat"
        onChange={(name) => changeCandidate(candidate.key, name)}
        value={candidates[candidate.key - 1].name}
      />
    </div>
  );
};

export default CandidateForm;
