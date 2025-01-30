import { FC, memo } from "react";

// project imports
import CarNumberItem from "../CarNumberItem";
import styles from "./styles.module.css";

// store
import { TCarsStore, useCarsStore } from "src/store/carsStore";
import { TSearchStore, useSearchStore } from "src/store/searchStore";

// types
import { TCar } from "src/types/car";

type Props = {
  filteredCars: TCar[];
};

const searchIdSelector = (state: TSearchStore) => state.searchId;
const isLoadingSelector = (state: TCarsStore) => state.isLoading;

const CarNumbersList: FC<Props> = (props) => {
  const { filteredCars } = props;

  const searchId = useSearchStore(searchIdSelector);
  const isLoading = useCarsStore(isLoadingSelector);

  if (isLoading) {
    return <p className={styles.text}>Loading...</p>;
  }

  if (!filteredCars.length) {
    return <p className={styles.text}>No Data</p>;
  }

  return (
    <div  className={styles.list}>
      {filteredCars.map((car) => {
        const { id, carNumber } = car;

        return (
          <CarNumberItem
            key={id}
            id={id}
            carNumber={carNumber}
            isSelected={id === searchId}
          />
        );
      })}
    </div>
  );
};

export default memo(CarNumbersList);
