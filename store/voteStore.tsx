/* eslint-disable no-unused-vars */

import { Votes } from 'type/types';
import create from 'zustand';

interface VoteStore {
  isLoading: boolean;
  votes: Votes[];
  fetchVote: () => void;
  deleteVote: (code: string) => void;
}

export const useVoteStore = create<VoteStore>()((set) => ({
  isLoading: false,
  votes: [],
  fetchVote: async () => {
    set({ isLoading: true });
    const result = await fetch('/api/vote');
    const data = await result.json();
    set({ votes: data.data });
    set({ isLoading: false });
  },
  deleteVote: (code) => {
    set((state) => {
      const newVotes = state.votes.filter((vote) => vote.code !== code);
      return { votes: newVotes };
    });
  },
}));
