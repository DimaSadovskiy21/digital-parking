import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// api
import { getCarsQuery } from "src/api/getCars";

// types
import { TCar } from "src/types/car";

export type TCarsStore = {
  cars: TCar[];
  isLoading: boolean;
  error: string;
};

export const useCarsStore = create(
  immer<TCarsStore>(() => ({
    cars: [],
    isLoading: true,
    error: "",
  }))
);

export const getCars = async () => {
  useCarsStore.setState((state) => {
    state.isLoading = true;
  });

  try {
    const cars = await getCarsQuery();

    useCarsStore.setState((state) => {
      state.cars = cars;
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    useCarsStore.setState((state) => {
      state.error = errorMessage;
    });
  } finally {
    useCarsStore.setState((state) => {
      state.isLoading = false;
    });
  }
};

export const addCar = (newCar: TCar) => {
  useCarsStore.setState((state) => {
    state.cars.push(newCar);
  });
};

export const updateCars = (modifiedCars: Map<string, TCar>) =>
  useCarsStore.setState((state) => {
    state.cars = state.cars.map((car) => {
     
      const isExist = modifiedCars.has(car.id);

      if (!isExist) {
        return car;
      }

      const updatedCar = modifiedCars.get(car.id);

      if (!updatedCar) {
        return car;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, isNew, ...restCar } = updatedCar;

      return restCar;
    });
  });

export const removeCar = (id: string) => {
  useCarsStore.setState((state) => {
    state.cars = state.cars.filter((car: TCar) => car.id !== id);
  });
};
