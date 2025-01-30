import { memo, MouseEvent, PropsWithChildren, useEffect } from "react";

// project imports
import { classNames } from "src/utils/classNames";
import styles from "./styles.module.css";
import Portal from "../Portal";
import Button from "../Button";
import CancelIcon from "src/assets/images/CancelIcon";

type Props = PropsWithChildren & {
  open: boolean;
  title?: string;
  handleSubmit?: () => void;
  onClose: () => void;
  className?: string;
};

const Modal = (props: Props) => {
  const { open, title, handleSubmit, onClose, className, children } = props;

  const onContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return;

  return (
    <Portal>
      <div
        className={classNames(
          styles.modal,
          { [styles.opened]: open },
          className ? [className] : undefined
        )}
      >
        <div className={styles.overlay} onClick={onClose}>
          <div className={styles.content} onClick={onContentClick}>
            <div className={styles.contentWrapper}>
              <div className={styles.contentHeaderContainer}>
                <h4>{title}</h4>
                <Button onClick={onClose}>
                  <CancelIcon />
                </Button>
              </div>
              {children}
              {!!handleSubmit && (
                <div className={styles.contentFooterContainer}>
                  <Button withBorder onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button withBorder onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default memo(Modal);
