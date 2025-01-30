import { FC, SVGProps } from "react";

// project imports
import styles from "./styles.module.css";

// utils
import { classNames } from "src/utils/classNames";

type Props = SVGProps<SVGGElement> & {
  disabled?: boolean;
};

const BUTTON_SIZE = 20;

const IconButton: FC<Props> = (props) => {
  const { children, disabled, ...restProps } = props;
  return (
    <g className={styles.iconButtonWrapper} {...restProps}>
      <rect
        className={classNames(styles.iconButton, {
          [styles.disabled]: !!disabled,
        })}
        height={BUTTON_SIZE}
        width={BUTTON_SIZE}
      />
      {children}
    </g>
  );
};

export default IconButton;
