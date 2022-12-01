import Layout from 'components/Layout';
import CandidateItem from 'components/participant/CandidateItem';
import Countdown from 'components/participant/Countdown';
import showModalConfirmation from 'components/participant/ModalConfirmation';
import Unauthorized from 'components/Unauthorized';
import { useSession } from 'next-auth/react';
import React from 'react';

const DetailParticipant = () => {
  const [selectedCandidate, setSelectedCandidate] = React.useState('');
  const { status } = useSession();

  if (status === 'loading') return <></>;
  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  const candidates = [
    {
      key: 1,
      name: 'Budi',
      votes: 1,
    },
    {
      key: 2,
      name: 'Anto',
      votes: 3,
    },
  ];
  const submitVote = () => {
    if (selectedCandidate) {
      return showModalConfirmation({
        title: 'Kamu yakin?',
        subtitle: `Kamu akan memilih ${selectedCandidate}`,
        positiveText: 'Ya, saya yakin',
        negativeText: 'Tidak',
      });
    }
    showModalConfirmation({
      title: 'Vote Gagal ❌',
      subtitle: 'Pilih salah satu kandidat',
    });
  };
  return (
    <Layout>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Pemillihan Ketua Osis</h1>
        <Countdown />
        <div className="w-full text-left">
          {candidates.map((candidate) => (
            <CandidateItem
              key={candidate.key}
              candidate={candidate}
              selectedCandidate={selectedCandidate}
              setSelectedCandidate={setSelectedCandidate}
            />
          ))}
        </div>
        <button
          onClick={() => {
            submitVote();
          }}
          className="bg-black px-4 py-3 text-white rounded-md sm:text-lg mt-5 text-sm "
        >
          Kirim Vote Saya
        </button>
      </div>
    </Layout>
  );
};

export default DetailParticipant;
