import { FC, useCallback, useRef, useState } from "react";

// project imports
import CarIcon from "src/assets/images/CarIcon";
import styles from "./styles.module.css";
import RotationButton from "./components/RotationButton";
import CarNumber from "./components/CarNumber";
import DeleteButton from "./components/DeleteButton";
import DeleteCarModal from "./modals/DeleteCarModal";

// utils
import { classNames } from "src/utils/classNames";

// store
import {
  addModifiedCar,
  removeModifiedCar,
  TModifiedCarsStore,
  useModifiedCarsStore,
} from "src/store/modifiedCarsStore";

// types
import { TCar, ModifiedTypeEnum } from "src/types/car";

type Props = TCar & {
  parkingHeight: number;
  parkingWidth: number;
  isOverlapped: boolean;
  isSelected: boolean;
};

const isCalculationSelector = (state: TModifiedCarsStore) =>
  state.isCalculation;

const CAR_WIDTH = 70;
const CAR_HEIGHT = 140;

const Car: FC<Props> = (props) => {
  const {
    id,
    fill,
    x,
    y,
    carNumber,
    rotation: currentRotation,
    isNew,
    parkingHeight,
    parkingWidth,
    isOverlapped,
    isSelected,
  } = props;

  const carRef = useRef<SVGGElement | null>(null);

  /* states */
  const [coordinates, setCoordinates] = useState({ x, y });
  const [rotation, setRotation] = useState(currentRotation);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const isCalculation = useModifiedCarsStore(isCalculationSelector);

  /* handlers */
  const handleMouseHover = () => setIsHovered((prev) => !prev);

  const handleRotationClick = useCallback(() => {
    const newRotation = (rotation + 180) % 360;

    if (
      newRotation === currentRotation &&
      coordinates.x === x &&
      coordinates.y === y &&
      !isNew
    ) {
      removeModifiedCar(id);
    } else {
      const type =
        coordinates.x === x && coordinates.y === y && !isNew
          ? ModifiedTypeEnum.rotation
          : ModifiedTypeEnum.position;

      const car: TCar = {
        id,
        carNumber,
        fill,
        rotation: newRotation,
        x: coordinates.x,
        y: coordinates.y,
        isNew,
        type,
      };
      addModifiedCar(car);
    }

    setRotation(newRotation);
  }, [
    carNumber,
    coordinates.x,
    coordinates.y,
    currentRotation,
    fill,
    id,
    isNew,
    rotation,
    x,
    y,
  ]);

  const handleCarMouseDown = (event: React.MouseEvent<SVGElement>) => {
    if (isCalculation) return;
    const currentElement = carRef.current;

    if (!currentElement) return;

    currentElement.parentNode?.appendChild(currentElement);

    setIsDragging(true);

    setDragStart({
      x: event.clientX - coordinates.x,
      y: event.clientY - coordinates.y,
    });
  };

  const handleCarMouseMove = (event: React.MouseEvent<SVGElement>) => {
    if (!isDragging || isCalculation) return;

    let newX = event.clientX - dragStart.x;
    let newY = event.clientY - dragStart.y;

    if (newX < 0) {
      newX = 0;
    }
    if (newX > parkingWidth - CAR_WIDTH) {
      newX = parkingWidth - CAR_WIDTH;
    }

    if (newY < 0) {
      newY = 0;
    }
    if (newY > parkingHeight - CAR_HEIGHT) {
      newY = parkingHeight - CAR_HEIGHT;
    }

    setCoordinates({ x: newX, y: newY });
  };

  const handleCarMouseUp = () => {
    if (isCalculation) return;
    setIsDragging(false);

    if (
      coordinates.x === x &&
      coordinates.y === y &&
      rotation === currentRotation &&
      !isNew
    ) {
      removeModifiedCar(id);
    } else {
      const type =
        coordinates.x === x && coordinates.y === y && !isNew
          ? ModifiedTypeEnum.rotation
          : ModifiedTypeEnum.position;

      const car: TCar = {
        id,
        carNumber,
        fill,
        rotation,
        x: coordinates.x,
        y: coordinates.y,
        isNew,
        type,
      };
      addModifiedCar(car);
    }
  };

  const handleCarMouseLeave = () => {
    if (isCalculation) return;

    setIsDragging(false);
  };

  const handleOpenDeleteModal = useCallback(
    () => setIsOpenDeleteModal(true),
    []
  );
  const handleCloseDeleteModal = useCallback(
    () => setIsOpenDeleteModal(false),
    []
  );

  return (
    <>
      <g
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
        ref={carRef}
      >
        <g
          className={classNames(styles.car, {
            [styles.draggingCar]: isDragging,
            [styles.disabled]: isCalculation,
            [styles.isOverlapped]: isOverlapped,
            [styles.isSelected]: isSelected,
          })}
          transform={`translate(${coordinates.x}, ${
            coordinates.y
          }) rotate(${rotation}, ${CAR_WIDTH / 2}, ${CAR_HEIGHT / 2})`}
          onMouseDown={handleCarMouseDown}
          onMouseMove={handleCarMouseMove}
          onMouseUp={handleCarMouseUp}
          onMouseLeave={handleCarMouseLeave}
        >
          <CarIcon fill={fill} />
        </g>
        {isHovered && (
          <g>
            <DeleteButton
              x={coordinates.x}
              y={coordinates.y}
              parkingWidth={parkingWidth}
              carWidth={CAR_WIDTH}
              handleDeleteClick={handleOpenDeleteModal}
            />
            <RotationButton
              x={coordinates.x}
              y={coordinates.y}
              parkingWidth={parkingWidth}
              carWidth={CAR_WIDTH}
              handleRotationClick={handleRotationClick}
            />
            <CarNumber
              x={coordinates.x}
              y={coordinates.y}
              carHeight={CAR_HEIGHT}
              carWidth={CAR_WIDTH}
              carNumber={carNumber}
              rotation={rotation}
            />
          </g>
        )}
      </g>
      <DeleteCarModal
        id={id}
        open={isOpenDeleteModal}
        title={carNumber}
        onClose={handleCloseDeleteModal}
      />
    </>
  );
};

export default Car;
