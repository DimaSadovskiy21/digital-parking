import { FC } from "react";

// project imports
import styles from "./styles.module.css";

type Props = {
  x: number;
  y: number;
  carHeight: number;
  carWidth: number;
  carNumber: string;
  rotation: number;
};

const CAR_NUMBER_HEIGHT = 16;

const CarNumber: FC<Props> = (props) => {
  const { x, y, carHeight, carWidth, carNumber, rotation } = props;

  const calculatedY = rotation
    ? y + carHeight - CAR_NUMBER_HEIGHT * 2
    : y + CAR_NUMBER_HEIGHT;

  return (
    <g transform={`translate(${x}, ${calculatedY})`}>
      <rect
        width={carWidth}
        height={CAR_NUMBER_HEIGHT}
        className={styles.carNumberWrapper}
      />
      <text
        x={carWidth / 2}
        y={CAR_NUMBER_HEIGHT / 2}
        className={styles.carNumber}
      >
        {carNumber.trim()}
      </text>
    </g>
  );
};

export default CarNumber;
