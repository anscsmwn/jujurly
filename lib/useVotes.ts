import useSWR from 'swr';
import { Response, Votes } from 'type/types';

export default function useVotes() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR<Response<Votes[]>>('/api/vote', fetcher);
  return {
    votes: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
