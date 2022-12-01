import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { MdOutlineWavingHand } from 'react-icons/md';
const Header = () => {
  const { data: session } = useSession();
  return (
    <>
      <header className="flex items-center justify-between py-5">
        <h1 className="font-bold text-4xl">Jujurly</h1>
        <div className="flex gap-5 items-center">
          <p className="text-lg font-semibold hidden sm:block">
            {session?.user?.name}
          </p>
          <button
            onClick={() => {
              if (session) {
                signOut();
              } else {
                signIn();
              }
            }}
            className="bg-black px-5 py-3 text-white rounded-md text-lg"
          >
            {session ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>
      {session && (
        <div className="flex sm:hidden gap-4 items-center">
          <p className="text-lg font-semibold ">Hi, {session?.user?.name}</p>
          <MdOutlineWavingHand className="text-2xl  wave" />
        </div>
      )}
    </>
  );
};

export default Header;
