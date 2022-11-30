import Layout from 'components/Layout';
import CandidateItem from 'components/participant/CandidateItem';
import Countdown from 'components/participant/Countdown';

import React from 'react';

const DetailParticipant = () => {
  return (
    <Layout>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Pemillihan Ketua Osis</h1>
        <Countdown />
        <div className="w-full text-left">
          <CandidateItem />
          <CandidateItem />
        </div>
        <button className="bg-black px-4 py-3 text-white rounded-md text-lg mt-5">
          Kirim Vote Saya
        </button>
      </div>
    </Layout>
  );
};

export default DetailParticipant;
