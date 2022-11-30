import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import id from 'date-fns/locale/id';
registerLocale('id', id);

import InputForm from './InputForm';
import CandidateFrom from './CandidateFrom';
import { useCreateVoteStore } from '#/createVoteStore';
import { AiOutlinePlus } from 'react-icons/ai';

const CreateVote = () => {
  const candidates = useCreateVoteStore((state) => state.candidates);
  const addCandidate = useCreateVoteStore((state) => state.addCandidate);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold">Detai Voting</h2>
      <form>
        <div className="flex flex-col gap-1 mt-2">
          <label className="font-medium text-lg">Judul</label>
          <InputForm
            className="w-full max-w-md"
            placeHolder="Contoh : Voting Calon Gubernur"
            onChange={() => {}}
            value=""
          />
        </div>
        <div className="mt-5">
          <label className="font-medium text-lg">Kapan Mulai?</label>
          <div className="flex flex-col sm:flex-row sm:space-x-7 space-y-3 sm:space-y-0 items-center">
            <ReactDatePicker
              selected={startDate}
              showTimeSelect
              minDate={new Date()}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="Pp"
              locale="id"
              className="bg-zinc-100 py-4 px-5 w-full max-w-md"
              placeholderText="Waktu Mulai"
            />
            <span className="font-semibold text-left">Sampai</span>
            <ReactDatePicker
              selected={endDate}
              showTimeSelect
              minDate={startDate}
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="Pp"
              locale="id"
              className="bg-zinc-100 py-4 px-5 w-full max-w-md"
              placeholderText="Waktu Selesai"
            />
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-2xl font-semibold">Kandidat</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <CandidateFrom key={candidate.key} candidate={candidate} />
            ))}
            <button
              type="button"
              onClick={addCandidate}
              className="p-5 bg-zinc-100 rounded-md w-fit h-fit hover:bg-black transition-all"
            >
              <AiOutlinePlus className="text-4xl text-zinc-300 transition-all" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateVote;
