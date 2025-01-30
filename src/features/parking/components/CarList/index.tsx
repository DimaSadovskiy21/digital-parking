import { FC, useEffect } from "react";

// project imports
import Car from "src/features/car";
import styles from "./styles.module.css";

// store
import { getCars, TCarsStore, useCarsStore } from "src/store/carsStore";
import {
  useOverlappedCarIdsStore,
  TOverlappedCarIdsStore,
} from "src/store/overlappedCarsStore";
import { TSearchStore, useSearchStore } from "src/store/searchStore";

type Props = {
  parkingHeight: number;
  parkingWidth: number;
};

const searchIdSelector = (state: TSearchStore) => state.searchId;
const carsSelector = (state: TCarsStore) => state.cars;
const isLoadingSelector = (state: TCarsStore) => state.isLoading;
const errorSelector = (state: TCarsStore) => state.error;
const overlappedCarIdsSelector = (state: TOverlappedCarIdsStore) =>
  state.overlappedCarIds;

const CarList: FC<Props> = (props) => {
  const { parkingHeight, parkingWidth } = props;

  const searchId = useSearchStore(searchIdSelector);
  const cars = useCarsStore(carsSelector);
  const isLoading = useCarsStore(isLoadingSelector);
  const error = useCarsStore(errorSelector);
  const overlappedCarIds = useOverlappedCarIdsStore(overlappedCarIdsSelector);

  useEffect(() => {
    getCars();
  }, []);

  if (isLoading || error) {
    let text = "Loading cars...";

    if (error) {
      text = error;
    }

    return (
      <>
        <rect
          className={styles.mask}
          height={parkingHeight}
          width={parkingWidth}
        />
        <text
          className={styles.text}
          x={parkingWidth / 2}
          y={parkingHeight / 2}
        >
          {text}
        </text>
      </>
    );
  }

  return cars.map((car) => {
    const { id, x, y, fill, carNumber, rotation, isNew, type } = car;
    return (
      <Car
        key={id}
        id={id}
        x={x}
        y={y}
        fill={fill}
        carNumber={carNumber}
        rotation={rotation}
        type={type}
        isNew={isNew}
        parkingHeight={parkingHeight}
        parkingWidth={parkingWidth}
        isOverlapped={overlappedCarIds.has(id)}
        isSelected={id === searchId}
      />
    );
  });
};

export default CarList;
