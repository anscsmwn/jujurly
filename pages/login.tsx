import Head from 'next/head';
import Link from 'next/link';
import { getProviders, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';

export default function Login({ providers }: any) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center container h-screen m-auto">
      <Head>
        <title>Login</title>
      </Head>

      <Link href="/" className="text-6xl mb-10 font-bold">
        Jujurly
      </Link>
      {/* <h1 className="text-2xl font-bold">Login</h1> */}
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className="w-1/3">
          <button
            onClick={() => signIn(provider.id)}
            className="inline-flex gap-3 justify-center items-center bg-white text-zinc-900 py-2 w-full border-2 border-zinc-900 font-medium hover:bg-zinc-900 hover:text-white"
          >
            {provider.name === 'Google' && <FcGoogle />}
            Login Dengan {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
