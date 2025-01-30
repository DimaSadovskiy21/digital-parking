import { FC } from "react";

type Props = {
  disabled?: boolean;
};

const RotationArrowsIcon: FC<Props> = (props) => {
  const { disabled } = props;

  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M17 4L14 7M17 20V4V20ZM17 4L20 7L17 4Z"
        stroke={disabled ? "#d6d2d2" : "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 20L4 17M7 4V20V4ZM7 20L10 17L7 20Z"
        stroke={disabled ? "#d6d2d2" : "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RotationArrowsIcon;
