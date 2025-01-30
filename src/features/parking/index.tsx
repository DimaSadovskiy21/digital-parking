// project imports
import CreateCarButton from "./components/CreateCarButton";
import CarList from "./components/CarList";
import Marking from "./components/Marking";
import SaveButton from "./components/SaveButton";

import styles from "./styles.module.css";

const PARKING_WIDTH = 600;
const PARKING_HEIGHT = 500;

const Parking = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SaveButton />
        <CreateCarButton />
      </div>
      <svg
        width={PARKING_WIDTH}
        height={PARKING_HEIGHT}
        className={styles.parking}
      >
        <Marking parkingHeight={PARKING_HEIGHT} parkingWidth={PARKING_WIDTH} />
        <CarList parkingHeight={PARKING_HEIGHT} parkingWidth={PARKING_WIDTH} />
      </svg>
    </div>
  );
};

export default Parking;
