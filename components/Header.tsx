import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-5">
      <h1 className="font-bold text-4xl">Jujurly</h1>
      <button className="bg-black px-4 py-3 text-white rounded-md text-lg">
        Login
      </button>
    </header>
  );
};

export default Header;
