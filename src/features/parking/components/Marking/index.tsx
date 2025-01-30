import { FC } from "react";

// project imports
import StartingPlace from "./components/StartingPlace";
import styles from "./styles.module.css";

const LINES = new Array(6).fill(0);
const PARKING_PLACE_WIDTH = 100;
const INDENTATION_X = 50;
const INDENTATION_BOTTOM_Y = 200;
const STROKE_WIDTH = 4;

type Props = {
  parkingHeight: number;
  parkingWidth: number;
};

const Marking: FC<Props> = (props) => {
  const { parkingHeight, parkingWidth } = props;

  return (
    <>
      <line
        className={styles.line}
        x1={INDENTATION_X}
        y1={(parkingHeight - INDENTATION_BOTTOM_Y) / 2}
        x2={parkingWidth - INDENTATION_X}
        y2={(parkingHeight - INDENTATION_BOTTOM_Y) / 2}
      />

      <StartingPlace
        height={(parkingHeight - INDENTATION_BOTTOM_Y) / 2}
        width={PARKING_PLACE_WIDTH}
        x={
          parkingWidth -
          (PARKING_PLACE_WIDTH + INDENTATION_X) +
          STROKE_WIDTH / 2
        }
        y={
          parkingHeight -
          (parkingHeight - INDENTATION_BOTTOM_Y) / 2 -
          INDENTATION_BOTTOM_Y / 8
        }
      />

      {LINES.map((_, index) => {
        const x =
          INDENTATION_X + PARKING_PLACE_WIDTH * index + STROKE_WIDTH / 2;

        return (
          <line
            key={index}
            className={styles.line}
            x1={x}
            y1={0}
            x2={x}
            y2={parkingHeight - INDENTATION_BOTTOM_Y}
          />
        );
      })}
    </>
  );
};

export default Marking;
