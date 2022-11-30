import InputForm from 'components/create/InputForm';
import Layout from 'components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Participant = () => {
  const [code, setCode] = React.useState('');
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
        <Link
          href={`/participant/${code}`}
          className="bg-black px-10 py-3 text-white rounded-md text-lg"
        >
          Lanjutkan
        </Link>
        <Link href="/">Kembali</Link>
      </div>
    </Layout>
  );
};

export default Participant;
