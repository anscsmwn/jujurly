import React from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between py-5">
      <h1 className="font-bold text-4xl">Jujurly</h1>
      <div className="flex gap-5 items-center">
        <p className="text-lg font-semibold">{session?.user?.name}</p>
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
  );
};

export default Header;
