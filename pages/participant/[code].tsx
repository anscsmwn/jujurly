import Layout from 'components/Layout';
import CandidateItem from 'components/participant/CandidateItem';
import Countdown from 'components/participant/Countdown';
import showModalConfirmation from 'components/participant/ModalConfirmation';
import Unauthorized from 'components/Unauthorized';
import useParticipant from 'lib/useParticipant';
import useVote from 'lib/useVote';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaVoteYea } from 'react-icons/fa';

const DetailParticipant = () => {
  const router = useRouter();

  const { code } = router.query;
  const [selectedCandidate, setSelectedCandidate] = React.useState('');
  const { data: session, status } = useSession();
  const { data, mutate } = useParticipant(code as string);
  const { vote, isLoading, mutate: mutateVote } = useVote(code as string);

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
  const hasParticipated = data.hasParticipated;

  const submitVote = () => {
    if (selectedCandidate) {
      return showModalConfirmation({
        title: 'Kamu yakin?',
        subtitle: `Kamu akan memilih ${selectedCandidate}`,
        positiveText: 'Ya, saya yakin',
        negativeText: 'Tidak',
        onPositiveClick: async () => {
          const res = await fetch(`/api/participant/${code}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              candidate: selectedCandidate,
            }),
          });
          if (res.status === 200) {
            showModalConfirmation({
              title: 'Terima kasih',
              subtitle: 'Pilihanmu sudah kami terima',
              positiveText: 'Oke',
            });
            mutate();
            mutateVote();
          }
        },
      });
    }
    showModalConfirmation({
      title: 'Vote Gagal ❌',
      subtitle: 'Pilih salah satu kandidat',
    });
  };
  return (
    <Layout title="Ikutan Voting">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">{vote?.title}</h1>
        {vote && <Countdown vote={vote} />}
        <div className="w-full text-left">
          {vote?.candidates.map((candidate) => (
            <CandidateItem
              percentage={candidate.percentage || 0}
              participant={data.participant}
              key={candidate.key}
              candidate={candidate}
              selectedCandidate={selectedCandidate}
              handleClick={() => {
                if (!hasParticipated) {
                  setSelectedCandidate(candidate.name);
                }
              }}
            />
          ))}
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FaVoteYea className="text-4xl" />
          <p className="text-left font-semibold">{vote?.totalVotes}</p>
        </div>
        {!isPublisher && !isEnded && !hasParticipated && (
          <button
            onClick={() => {
              submitVote();
            }}
            className="bg-black px-4 py-3 text-white rounded-md sm:text-lg my-5 text-sm "
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
        {hasParticipated && (
          <div className="flex mt-5 font-semibold justify-center">
            <div className="bg-zinc-100 py-2 px-7 rounded-md flex gap-2 items-center ">
              <FiAlertTriangle />
              <p>Kamu sudah melakukan voting</p>
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
