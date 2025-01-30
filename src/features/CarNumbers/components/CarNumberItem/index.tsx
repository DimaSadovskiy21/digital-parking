import { FC } from "react";

// project imports
import styles from "./styles.module.css";

// utils
import { classNames } from "src/utils/classNames";

// store
import { setSearch } from "src/store/searchStore";

// types
import { TCar } from "src/types/car";

type Props = Pick<TCar, "id" | "carNumber"> & {
  isSelected: boolean;
};

const CarNumberItem: FC<Props> = (props) => {
  const { id, carNumber, isSelected } = props;

  const handleClick = () => (isSelected ? setSearch("") : setSearch(id));

  return (
    <p
      className={classNames(styles.item, { [styles.isSelected]: isSelected })}
      onClick={handleClick}
    >
      {carNumber}
    </p>
  );
};

export default CarNumberItem;
