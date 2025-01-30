import { FC, memo, useCallback } from "react";
import toast from "react-hot-toast";

// project imports
import Modal from "src/components/Modal";
import CreateCarForm from "./form";
import { CarFormValues } from "./schema";

// store
import { addCar } from "src/store/carsStore";
import { addModifiedCar } from "src/store/modifiedCarsStore";

// types
import { ModifiedTypeEnum, TCar } from "src/types/car";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddCarModal: FC<Props> = (props) => {
  const { open, onClose } = props;

  const handleSubmit = useCallback(
    (values: CarFormValues) => {
      const { carNumber, fill } = values;

      const newCar: TCar = {
        id: crypto.randomUUID(),
        x: 465,
        y: 330,
        carNumber,
        fill,
        rotation: 0,
        type: ModifiedTypeEnum.position,
        isNew: true,
      };

      addCar(newCar);
      addModifiedCar(newCar);

      toast.success("The car has been successfully created");

      onClose();
    },
    [onClose]
  );

  return (
    <Modal open={open} title="Create a new car" onClose={onClose}>
      <CreateCarForm onSubmit={handleSubmit} />
    </Modal>
  );
};

export default memo(AddCarModal);
