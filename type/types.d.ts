export type Candidate = {
  key: number;
  name: string;
  votes?: number;
};

export interface Response<T> {
  status: number;
  data?: T;
}
export interface Votes {
  id: string;
  publisher: string;
  title: string;
  code: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
  totalVotes: number;
  createdAt: string;
}
