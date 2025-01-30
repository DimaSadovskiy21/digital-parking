import { FC, InputHTMLAttributes } from "react";

// project imports
import styles from "./styles.module.css";
import { classNames } from "src/utils/classNames";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
  fullWidth?: boolean;
};

const Input: FC<Props> = (props) => {
  const { className, isError, fullWidth, ...restProps } = props;
  return (
    <input
      className={classNames(
        styles.input,
        {
          [styles.error]: !!isError,
          [styles.fullWidth]: !!fullWidth,
        },
        className ? [className] : undefined
      )}
      {...restProps}
    />
  );
};

export default Input;
