import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <Head>
        <title>Login</title>
      </Head>
      <Image
        src={'/unauthorized.svg'}
        alt="thinking"
        width={300}
        height={300}
      />
      <h1 className="text-4xl font-bold">Login Dulu Yah!</h1>
      <h2 className="mx-4 text-center sm:text-lg">
        Untuk mengakses halaman ini, kamu wajib login terlebih dahulu
      </h2>
      <button
        onClick={() => {
          signIn();
        }}
        className="bg-black px-5 py-3 text-white rounded-md text-lg"
      >
        Login
      </button>
    </div>
  );
};

export default Unauthorized;
