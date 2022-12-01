/* eslint-disable no-unused-vars */
import { Candidate } from 'type/types';
import create from 'zustand';

interface CreateVoteStore {
  candidates: Candidate[];
  addCandidate: () => void;
  removeCandidate: (key: number) => void;
  changeCandidate: (key: number, name: string) => void;
  setCandidate: (candidates: Candidate[]) => void;
}

export const useCreateVoteStore = create<CreateVoteStore>()((set) => ({
  candidates: [],
  addCandidate: () => {
    set((state) => {
      const newCandidate = {
        key: state.candidates.length + 1,
        name: '',
      };
      const newCandidates = [...state.candidates, newCandidate];
      return { candidates: newCandidates };
    });
  },
  changeCandidate: (key: number, name: string) => {
    set((state) => {
      const newCandidates = state.candidates.map((candidate) => {
        if (candidate.key === key) {
          return { ...candidate, name };
        }
        return candidate;
      });
      return { candidates: newCandidates };
    });
  },
  removeCandidate: (key) => {
    set((state) => {
      const newCandidates = state.candidates.filter(
        (candidate) => candidate.key !== key,
      );
      newCandidates.forEach((candidate, index) => {
        candidate.key = index + 1;
      });
      return { candidates: newCandidates };
    });
  },
  setCandidate: (candidates) => {
    set({ candidates });
  },
}));
