import { FC, memo, useCallback } from "react";
import toast from "react-hot-toast";

// project imports
import Modal from "src/components/Modal";

// store
import { removeCar } from "src/store/carsStore";

type Props = {
  id: string;
  open: boolean;
  title: string;
  onClose: () => void;
};

const DeleteCarModal: FC<Props> = (props) => {
  const { id, open, title, onClose } = props;

  const handleSubmit = useCallback(() => {
    removeCar(id);

    toast.success("The car was successfully deleted");

    onClose();
  }, [id, onClose]);

  return (
    <Modal
      open={open}
      title={title}
      handleSubmit={handleSubmit}
      onClose={onClose}
    >
      <span>Are you sure you want to delete this car?</span>
    </Modal>
  );
};

export default memo(DeleteCarModal);
