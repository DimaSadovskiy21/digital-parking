import { FC } from "react";

// project imports
import styles from "./styles.module.css";

type Props = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const PATTERN_ID = "striped-pattern";
const PATTERN_SIZE = 40;

const StartingPlace: FC<Props> = (props) => {
  const { height, width, x, y } = props;

  return (
    <g>
      <defs>
        <pattern
          className={styles.pattern}
          id={PATTERN_ID}
          width={PATTERN_SIZE}
          height={PATTERN_SIZE}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(50)"
        >
          <rect className={styles.patternBackground} width={PATTERN_SIZE} height={PATTERN_SIZE}  />
          <line className={styles.patternLine} x1={0} y1={0} x2={0} y2={PATTERN_SIZE} strokeWidth={PATTERN_SIZE} />
        </pattern>
      </defs>
      <rect
        height={height}
        width={width}
        x={x}
        y={y}
        fill={`url(#${PATTERN_ID})`}
      />
    </g>
  );
};

export default StartingPlace;
