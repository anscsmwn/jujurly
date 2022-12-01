import InputForm from 'components/create/InputForm';
import Layout from 'components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import Unauthorized from 'components/Unauthorized';
import { useSession } from 'next-auth/react';
import React from 'react';
import showModalConfirmation from 'components/participant/ModalConfirmation';
import { useRouter } from 'next/router';

const Participant = () => {
  const [code, setCode] = React.useState('');
  const { status } = useSession();
  const router = useRouter();
  if (status === 'loading') return <></>;
  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }
  const submit = async () => {
    if (code === '')
      return showModalConfirmation({
        title: 'Join Vote Gagal ❌',
        subtitle: 'Kode vote tidak boleh kosong',
      });
    const res = await (await fetch(`/api/vote/${code}`)).json();
    if (res.status === 404) {
      return showModalConfirmation({
        title: 'Join Vote Gagal ❌',
        subtitle: 'Kode vote tidak ditemukan',
      });
    }
    if (res.status === 200) {
      return showModalConfirmation({
        title: 'Join Vote Berhasil ✅',
        subtitle: 'Silahkan menekan tombol join vote',
        positiveText: 'Join Vote',
        negativeText: 'Batal',
        onPositiveClick: () => {
          router.push(`/participant/${code}`);
        },
      });
    }
  };

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center mt-10 space-y-4">
        <div className="text-center">
          <Image
            className="mx-auto"
            src={'/join-voting.svg'}
            width={300}
            height={300}
            alt="join-voting"
          />
          <h1 className="text-4xl font-bold">Ikutan Voting</h1>
          <h2 className="text-lg mt-3 max-w-lg text-center">
            Untuk ikutan voting, kamu harus memasukkan kode voting yang sudah di
            berikan panitia/penyelenggara
          </h2>
        </div>
        <InputForm
          onChange={setCode}
          value={code}
          placeHolder="Masukan Code Voting"
          className="w-full max-w-lg"
        />
        <button
          onClick={() => {
            submit();
          }}
          className="bg-black px-10 py-3 text-white rounded-md text-lg"
        >
          Lanjutkan
        </button>
        <Link href="/">Kembali</Link>
      </div>
    </Layout>
  );
};

export default Participant;
