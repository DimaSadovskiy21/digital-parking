import { FC, memo } from "react";

// project imports
import RotationArrowsIcon from "src/assets/images/RotationArrowsIcon";
import IconButton from "src/components/IconButton";

// store
import {
  TModifiedCarsStore,
  useModifiedCarsStore,
} from "src/store/modifiedCarsStore";

type Props = {
  x: number;
  y: number;
  parkingWidth: number;
  carWidth: number;
  handleRotationClick: () => void;
};

const isCalculationSelector = (state: TModifiedCarsStore) =>
  state.isCalculation;

const BUTTON_SIZE = 20;

const RotationButton: FC<Props> = (props) => {
  const { x, y, parkingWidth, carWidth, handleRotationClick } = props;

  const isCalculation = useModifiedCarsStore(isCalculationSelector);

  const calculatedX = x + carWidth - BUTTON_SIZE / 4;
  const reverseCalculatedX = x - BUTTON_SIZE / 1.5;
  const currentX =
    calculatedX <= parkingWidth - BUTTON_SIZE
      ? calculatedX
      : reverseCalculatedX;
  const calculatedY = y + BUTTON_SIZE + carWidth - BUTTON_SIZE / 2;

  return (
    <IconButton
      transform={`translate(${currentX}, ${calculatedY})`}
      onClick={handleRotationClick}
      disabled={isCalculation}
    >
      <RotationArrowsIcon  disabled={isCalculation}/>
    </IconButton>
  );
};

export default memo(RotationButton);
