import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineLink } from 'react-icons/ai';
const Table = () => {
  return (
    <div className="my-10 overflow-x-auto">
      <h3 className="font-bold text-2xl mb-5">Vote yang saya buat</h3>
      <table className="table-auto border border-zinc-100 w-full rounded-sm">
        <thead>
          <tr>
            <th className="p-5 text-left">No</th>
            <th className="p-5 text-left">Judul</th>
            <th className="p-5 text-left">Kandidat</th>
            <th className="p-5 text-left">Kode</th>
            <th className="p-5 text-left">Mulai</th>
            <th className="p-5 text-left">Selesai</th>
            <th className="p-5 text-left"></th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-5 text-left">1</td>
            <td className="p-5 text-left">Pemilihan Organisasi</td>
            <td className="p-5 text-left">Budi VS Anto</td>
            <td className="p-5 text-left">BXAIZH</td>
            <td className="p-5 text-left">20 Oct 2022 11:00 AM</td>
            <td className="p-5 text-left">22 Oct 2022 11:AM</td>
            <td className="p-5 text-left">
              <button>
                <AiOutlineLink />
              </button>
              <button>
                <BiTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
