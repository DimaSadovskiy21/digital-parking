import { ButtonHTMLAttributes, FC } from "react";

// project imports
import styles from "./styles.module.css";
import { classNames } from "src/utils/classNames";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  withBorder?: boolean;
  fullWidth?: boolean;
};

const Button: FC<Props> = (props) => {
  const { children, className, withBorder, fullWidth, ...restProps } = props;
  return (
    <button
      className={classNames(
        styles.button,
        { [styles.border]: !!withBorder,
          [styles.fullWidth]: !!fullWidth
         },
        className ? [className] : undefined
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
