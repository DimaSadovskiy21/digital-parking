import { FC } from "react";

type Props = {
  disabled?: boolean;
};

const CancelIcon: FC<Props> = (props) => {
  const { disabled } = props;

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12.0009 12L17.2435 17.2426M6.7583 17.2426L12.0009 12L6.7583 17.2426ZM17.2435 6.75732L12.0009 12L17.2435 6.75732ZM12.0009 12L6.7583 6.75732L12.0009 12Z"
        stroke={disabled ? "#d6d2d2" : "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CancelIcon;
