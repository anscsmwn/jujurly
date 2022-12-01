import { participants } from '@prisma/client';
import useSWR from 'swr';
import { Response } from 'type/types';

export default function useParticipant(code: string) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, mutate } = useSWR<Response<participants>>(
    '/api/participant/' + code,
    fetcher,
  );

  return {
    data: {
      participant: data?.data,
      hasParticipated: data?.data?.code === code,
    },
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
}
