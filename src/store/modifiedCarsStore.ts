import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

// types
import { TCar } from "src/types/car";

enableMapSet();

export type TModifiedCarsStore = {
  modifiedCars: Map<string, TCar>;
  isCalculation: boolean;
};

export const useModifiedCarsStore = create(
  immer<TModifiedCarsStore>(() => ({
    modifiedCars: new Map(),
    isCalculation: false,
  }))
);

export const addModifiedCar = (modifiedCar: TCar) =>
  useModifiedCarsStore.setState((state) => {
    state.modifiedCars.set(modifiedCar.id, modifiedCar);
  });

export const removeModifiedCar = (id: string) =>
  useModifiedCarsStore.setState((state) => {
    state.modifiedCars.delete(id);
  });

export const clearModifiedCars = () =>
  useModifiedCarsStore.setState((state) => {
    state.modifiedCars.clear();
  });

export const setIsCalculation = (isCalculation: boolean) =>
  useModifiedCarsStore.setState((state) => {
    state.isCalculation = isCalculation;
  });
