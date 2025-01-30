import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TSearchStore = {
  searchId: string;
};

export const useSearchStore = create(
  immer<TSearchStore>(() => ({
    searchId: "",
  }))
);

export const setSearch = (searchId: string) =>
  useSearchStore.setState((state) => {
    state.searchId = searchId;
  });
