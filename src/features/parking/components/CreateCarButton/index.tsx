import { useCallback, useState } from "react";

// project imports
import Button from "src/components/Button";
import CreateCarModal from "./modals/CreateCarModal";

// store
import {
  TModifiedCarsStore,
  useModifiedCarsStore,
} from "src/store/modifiedCarsStore";

const isCalculationSelector = (state: TModifiedCarsStore) =>
  state.isCalculation;

const CreateCarButton = () => {
  const isCalculation = useModifiedCarsStore(isCalculationSelector);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button
        withBorder
        fullWidth
        onClick={handleOpen}
        disabled={isCalculation}
      >
        Create
      </Button>
      <CreateCarModal open={isOpen} onClose={handleClose} />
    </>
  );
};

export default CreateCarButton;
