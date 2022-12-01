/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { AiOutlineLink, AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useSession } from 'next-auth/react';
import { formattedDate } from 'lib/utils';
import showModalConfirmation from './participant/ModalConfirmation';
import { useVoteStore } from '#/voteStore';
import { useRouter } from 'next/router';
const TableVote = () => {
  const router = useRouter();
  const { status } = useSession();
  const { votes, isLoading, fetchVote, deleteVote } = useVoteStore();
  useEffect(() => {
    fetchVote();
  }, []);
  if (status === 'loading' || isLoading)
    return (
      <div className="text-center font-semibold mt-7">
        <AiOutlineLoading3Quarters className="animate-spin text-center inline-block" />
      </div>
    );

  const handleDeleteVote = (code: string) => {
    showModalConfirmation({
      title: 'Kamu yakin?',
      subtitle: 'Kamu akan menghapus vote ini',
      positiveText: 'Ya, saya yakin',
      negativeText: 'Tidak',
      onPositiveClick: async () => {
        const result = await fetch(`/api/vote/${code}`, {
          method: 'DELETE',
        });
        if (result.status === 200) {
          deleteVote(code);
          showModalConfirmation({
            title: 'Vote berhasil dihapus',
            subtitle: 'Vote berhasil dihapus',
          });
        }
        if (result.status !== 200) {
          showModalConfirmation({
            title: 'Vote gagal dihapus',
            subtitle: 'Vote gagal dihapus',
          });
        }
      },
    });
  };
  return (
    <div className="my-10 overflow-x-auto">
      <h3 className="font-bold text-2xl mb-5">Vote yang saya buat</h3>
      <table className="table-auto border border-zinc-100 w-full rounded-sm">
        <thead>
          <tr>
            <th className="p-5 text-left bg-black/90 text-white rounded-tl-md">
              No
            </th>
            <th className="p-5 text-left bg-black/90 text-white ">Judul</th>
            <th className="p-5 text-left bg-black/90 text-white ">Kandidat</th>
            <th className="p-5 text-left bg-black/90 text-white ">Kode</th>
            <th className="p-5 text-left bg-black/90 text-white ">Mulai</th>
            <th className="p-5 text-left bg-black/90 text-white ">Selesai</th>
            <th className="p-5 text-left bg-black/90 text-white rounded-tr-md"></th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>
          {status === 'unauthenticated' && (
            <tr>
              <td
                colSpan={7}
                className="p-5 text-center font-semibold text-gray-400"
              >
                Anda harus login untuk melihat vote yang anda buat
              </td>
            </tr>
          )}
          {votes?.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="p-5 text-center font-semibold text-gray-400"
              >
                Belum ada vote yang dibuat
              </td>
            </tr>
          )}
          {votes?.map((vote, index) => (
            <tr key={index}>
              <td className="p-5 text-left">{index + 1}.</td>
              <td
                className="p-5 text-left font-semibold cursor-pointer hover:underline"
                onClick={() => {
                  router.push(`/vote/${vote.code}`);
                }}
              >
                {vote.title}
              </td>
              <td className="p-5 text-left">
                {vote.candidates.map((candidate, index) => (
                  <span key={index}>
                    {candidate.name}{' '}
                    <span className="font-semibold inline-block mx-2">
                      {vote.candidates.length === index + 1 ? '' : 'VS'}
                    </span>
                  </span>
                ))}
              </td>
              <td className="p-5 text-left font-semibold">{vote.code}</td>
              <td className="p-5 text-left">{formattedDate(vote.startDate)}</td>
              <td className="p-5 text-left">{formattedDate(vote.endDate)}</td>
              <td className="p-5 text-left">
                <button
                  onClick={() => {
                    router.push(`/vote/${vote.code}`);
                  }}
                >
                  <BiPencil />
                </button>
                <button>
                  <AiOutlineLink />
                </button>
                <button
                  onClick={() => {
                    handleDeleteVote(vote.code);
                  }}
                >
                  <BiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVote;
