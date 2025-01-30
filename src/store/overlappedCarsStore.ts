import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

export type TOverlappedCarIdsStore = {
  overlappedCarIds: Set<string>;
};

export const useOverlappedCarIdsStore = create(
  immer<TOverlappedCarIdsStore>(() => ({
    overlappedCarIds: new Set(),
  }))
);

export const addOverlappedCarIds = (ids: Set<string>) =>
  useOverlappedCarIdsStore.setState((state) => {
    state.overlappedCarIds = ids;
  });

export const clearOverlappedCarIds = () =>
  useOverlappedCarIdsStore.setState((state) => {
    state.overlappedCarIds.clear();
  });
