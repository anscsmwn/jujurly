import CreateVote from 'components/create/CreateVote';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Unauthorized from 'components/Unauthorized';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Create = () => {
  const { status } = useSession();
  if (status === 'loading') return <></>;
  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }
  return (
    <Layout>
      <Header />
      <div className="mt-10">
        <Image
          src="/make-voting.svg"
          width={300}
          height={300}
          alt="make-voting"
        />
        <p className="text-4xl font-bold mt-5">Buat Voting Baru</p>
        <p className="text-lg text-zinc-700">
          Silahkan masukkan data yang dibutuhkan sebelum membuat vote online
        </p>
      </div>
      <CreateVote />
    </Layout>
  );
};

export default Create;
