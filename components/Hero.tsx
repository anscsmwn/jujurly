import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 my-10">
      <p className="font-bold text-6xl text-center">Ayo Mulai Voting</p>
      <p className="text-xl bg-neutral-100 px-4 py-3 rounded-md text-center">
        Pilihlah calon yang paling kamu sukai
      </p>
      <Image src={'/women-sitting.svg'} width={300} height={300} alt="hero" />
    </div>
  );
};

export default Hero;
