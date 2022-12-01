import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineLink } from 'react-icons/ai';
import useVotes from 'lib/useVotes';
import { useSession } from 'next-auth/react';
import { formattedDate } from 'lib/utils';
const Table = () => {
  const { status } = useSession();
  const { votes, isLoading } = useVotes();
  console.log(votes);
  if (status === 'loading') return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(isLoading);
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
              <td className="p-5 text-left">{vote.title}</td>
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
                <button>
                  <AiOutlineLink />
                </button>
                <button>
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

export default Table;
