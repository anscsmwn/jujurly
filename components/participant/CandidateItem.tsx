import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
const CandidateItem = () => {
  return (
    <article className="flex border border-zinc-100 p-5 space-x-4">
      <div className="flex justify-center p-3 rounded-md items-center bg-neutral-100 w-16 h-16">
        <p className="text-lg font-semibold">1</p>
      </div>
      <div className="w-full">
        <p className="text-3xl font-bold">Budi</p>
        <p>Kandidat 1</p>
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
      <div className=" bg-zinc-100 w-1/12 flex justify-center p-3 rounded-md items-center">
        <AiOutlineCheck className="w-7 h-7" />
      </div>
    </article>
  );
};

export default CandidateItem;
