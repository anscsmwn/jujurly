import Layout from 'components/Layout';
import CandidateItem from 'components/participant/CandidateItem';
import Countdown from 'components/participant/Countdown';
import showModalConfirmation from 'components/participant/ModalConfirmation';
import Unauthorized from 'components/Unauthorized';
import useVote from 'lib/useVote';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const DetailParticipant = () => {
  const router = useRouter();

  const { code } = router.query;
  const [selectedCandidate, setSelectedCandidate] = React.useState('');
  const { data: session, status } = useSession();
  const { vote, isLoading } = useVote(code as string);

  if (status === 'loading' || isLoading)
    return (
      <div className="flex items-center flex-col justify-center">
        <Image src={'/loading.svg'} alt="loading" width={500} height={500} />
        <p className="text=4xl font-semibold mt-2">Tunggu Sebentar</p>
      </div>
    );
  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }
  const isPublisher = session?.user?.email === vote?.publisher;
  const isEnded = vote && new Date(vote.endDate) < new Date();
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
        <h1 className="text-4xl font-bold">{vote?.title}</h1>
        {vote && <Countdown vote={vote} />}
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
        {!isPublisher && !isEnded && (
          <button
            onClick={() => {
              submitVote();
            }}
            className="bg-black px-4 py-3 text-white rounded-md sm:text-lg mt-5 text-sm "
          >
            Kirim Vote Saya
          </button>
        )}
        {isPublisher && (
          <div className="flex mt-5 font-semibold justify-center">
            <div className="bg-zinc-100 py-2 px-7 rounded-md flex gap-2 items-center ">
              <FiAlertTriangle />
              <p>Pembuat vote tidak dapat melakukan voting</p>
            </div>
          </div>
        )}
        {isEnded && (
          <div className="flex mt-5 font-semibold justify-center">
            <div className="bg-zinc-100 py-2 px-7 rounded-md flex gap-2 items-center ">
              <FiAlertTriangle />
              <p>Vote telah berakhir</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DetailParticipant;
