import { ChangeEvent, useEffect, useMemo, useState } from "react";

// project imports
import Input from "src/components/Input";
import CarNumbersList from "./components/CarNumbersList";
import styles from "./styles.module.css";

// store
import { TCarsStore, useCarsStore } from "src/store/carsStore";

const carsSelector = (state: TCarsStore) => state.cars;
const isLoadingSelector = (state: TCarsStore) => state.isLoading;

const CarNumbers = () => {
  const cars = useCarsStore(carsSelector);
  const isLoading = useCarsStore(isLoadingSelector);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const filteredCars = useMemo(
    () =>
      cars.filter((car) => {
        const { carNumber } = car;

        return carNumber
          .trim()
          .toLocaleLowerCase()
          .includes(debouncedSearchTerm.trim().toLocaleLowerCase());
      }),
    [cars, debouncedSearchTerm]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
        disabled={isLoading || !cars.length}
      />
      <CarNumbersList filteredCars={filteredCars} />
    </div>
  );
};

export default CarNumbers;
