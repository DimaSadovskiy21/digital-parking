import toast from "react-hot-toast";

// project imports
import Button from "src/components/Button";

// store
import { updateCars, useCarsStore, TCarsStore } from "src/store/carsStore";
import {
  clearModifiedCars,
  setIsCalculation,
  TModifiedCarsStore,
  useModifiedCarsStore,
} from "src/store/modifiedCarsStore";
import {
  addOverlappedCarIds,
  clearOverlappedCarIds,
} from "src/store/overlappedCarsStore";

const carsSelector = (state: TCarsStore) => state.cars;
const modifiedCarsSelector = (state: TModifiedCarsStore) => state.modifiedCars;
const isCalculationSelector = (state: TModifiedCarsStore) =>
  state.isCalculation;

const SaveButton = () => {
  const cars = useCarsStore(carsSelector);
  const modifiedCars = useModifiedCarsStore(modifiedCarsSelector);
  const isCalculation = useModifiedCarsStore(isCalculationSelector);

  const handleSave = () => {
    setIsCalculation(true);

    const worker = new Worker(new URL("/worker.js", import.meta.url));

    worker.postMessage({
      cars,
      modifiedCars,
    });

    worker.onmessage = (event) => {
      const overlappedCars = event.data;

      if (overlappedCars.size) {
        addOverlappedCarIds(overlappedCars);
        toast.error(
          "Your changes cannot be saved because some cars overlap each other."
        );
      } else {
        updateCars(modifiedCars);

        clearModifiedCars();

        clearOverlappedCarIds();

        toast.success("The changes were saved successfully");
      }

      setIsCalculation(false);
      worker.terminate();
    };

    worker.onerror = (error) => {
      toast.error(`Worker error: ${error.message}`);
      setIsCalculation(false);
      worker.terminate();
    };
  };

  return (
    <Button
      withBorder
      fullWidth
      disabled={!modifiedCars.size || isCalculation}
      onClick={handleSave}
    >
      Save
    </Button>
  );
};

export default SaveButton;
