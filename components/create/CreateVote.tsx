import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import id from 'date-fns/locale/id';
registerLocale('id', id);

import InputForm from './InputForm';
import CandidateFrom from './CandidateFrom';
import { useCreateVoteStore } from '#/createVoteStore';
import { AiOutlinePlus } from 'react-icons/ai';
import showModalConfirmation from 'components/participant/ModalConfirmation';
import { useSession } from 'next-auth/react';
import { Candidate } from 'type/types';
import { generateCode } from 'lib/utils';
import useVote from 'lib/useVote';
import { useRouter } from 'next/router';

interface CreateVoteProps {
  isEdit?: boolean;
}

const CreateVote = ({ isEdit }: CreateVoteProps) => {
  const router = useRouter();
  const { code } = router.query;
  const { data: session } = useSession();
  const candidates = useCreateVoteStore((state) => state.candidates);
  const addCandidate = useCreateVoteStore((state) => state.addCandidate);
  const setCandidate = useCreateVoteStore((state) => state.setCandidate);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const { vote } = useVote(code as string);

  React.useEffect(() => {
    if (vote) {
      const { title, candidates, startDate, endDate } = vote;
      setTitle(title);
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
      setCandidate(candidates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  type Vote = {
    title: string;
    startDate: Date;
    endDate: Date;
    candidates: Candidate[];
    publisher: string | undefined | null;
    code: string;
  };
  const submitVote = (e: any) => {
    e.preventDefault();
    if (!title) {
      return showModalConfirmation({
        title: 'Vote Gagal ❌',
        subtitle: 'Judul vote tidak boleh kosong',
      });
    }
    if (!startDate || !endDate) {
      return showModalConfirmation({
        title: 'Vote Gagal ❌',
        subtitle: 'Tanggal vote tidak boleh kosong',
      });
    }
    if (candidates.length < 2) {
      return showModalConfirmation({
        title: 'Vote Gagal ❌',
        subtitle: 'Minimal ada 2 kandidat',
      });
    }
    showModalConfirmation({
      isLoading: isLoadingSubmit,
      title: 'Kamu yakin?',
      subtitle: `Kamu akan membuat vote dengan judul ${title}`,
      positiveText: 'Ya, saya yakin',
      negativeText: 'Tidak',
      onPositiveClick: async () => {
        setIsLoadingSubmit(true);
        const vote: Vote = {
          title,
          startDate,
          endDate,
          candidates,
          publisher: session?.user?.email,
          code: generateCode(6),
        };
        if (isEdit) {
          const result = await fetch(`/api/vote/${vote.code}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vote),
          });
          if (result.status === 200) {
            showModalConfirmation({
              title: 'Vote berhasil diubah',
              subtitle: `Vote dengan judul ${title} berhasil diubah`,
            });
          }
          return;
        }
        const result = await fetch('/api/vote ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vote),
        });

        if (result.status === 200) {
          showModalConfirmation({
            title: 'Vote Berhasil Dibuat',
            subtitle: `Kamu berhasil
            membuat vote dengan judul ${title}`,
          });
        }
      },
    });
  };
  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold">Detail Voting</h2>
      <form onSubmit={submitVote}>
        <div className="flex flex-col gap-1 mt-2">
          <label className="font-medium text-lg">Judul</label>
          <InputForm
            className="w-full lg:max-w-md"
            placeHolder="Contoh : Voting Calon Gubernur"
            onChange={setTitle}
            value={title}
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
              className="bg-zinc-100 py-4 px-5 w-full lg:max-w-md"
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
              className="bg-zinc-100 py-4 px-5 w-full lg:max-w-md"
              placeholderText="Waktu Selesai"
            />
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-2xl font-semibold">Kandidat</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
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
        <button className="bg-black px-5 py-3 text-white rounded-md text-lg mt-5">
          Buat Vote
        </button>
      </form>
    </div>
  );
};

export default CreateVote;
