// types
import { TCar } from "src/types/car";

const cars: TCar[] = [
  {
    id: crypto.randomUUID(),
    x: 70,
    y: 0,
    fill: "red",
    carNumber: "2322AX-7",
    rotation: 0,
  },
  {
    id: crypto.randomUUID(),
    x: 70,
    y: 160,
    fill: "white",
    carNumber: "8682AX-7",
    rotation: 180,
  },
  {
    id: crypto.randomUUID(),
    x: 270,
    y: 160,
    fill: "yellow",
    carNumber: "7777XX-7",
    rotation: 0,
  },
];

// Simulating a request
export const getCarsQuery = (): Promise<TCar[]> =>
  new Promise((resolve) => setTimeout(() => resolve(cars), 2000));
