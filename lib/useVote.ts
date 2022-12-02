import useSWR from 'swr';
import { Response, Votes } from 'type/types';

export default function useVote(code: string) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, mutate, error } = useSWR<Response<Votes>>(
    code ? `/api/vote/${code}` : null,
    fetcher,
  );

  return {
    vote: data?.data,
    isLoading: !error && !data,
    mutate,
    isError: error,
  };
}
