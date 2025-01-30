import { ChangeEvent, FC, memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// project imports
import Input from "src/components/Input";
import Button from "src/components/Button";
import styles from "./styles.module.css";
import { CarFormValues, carFormSchema } from "./schema";

type Props = {
  onSubmit: (values: CarFormValues) => void;
};

const CreateCarForm: FC<Props> = (props) => {
  const { onSubmit } = props;
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, disabled },
  } = useForm<CarFormValues>({
    defaultValues: {
      carNumber: "",
      fill: "#000000",
    },
    resolver: zodResolver(carFormSchema),
  });
  const isDisabled = disabled || isSubmitting;

  const handleCarNumberChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue("carNumber", event.target.value.trim());

  const handleFillChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue("fill", event.target.value);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        value={watch("carNumber")}
        onChange={handleCarNumberChange}
        placeholder="Car Number (Max Length: 7)"
        type="text"
        maxLength={7}
        isError={!!errors.carNumber?.message}
        disabled={isDisabled}
      />
      <Input
        className={styles.inputFill}
        value={watch("fill")}
        onChange={handleFillChange}
        type="color"
        isError={!!errors.fill?.message}
        disabled={isDisabled}
      />
      <Button type="submit" withBorder fullWidth disabled={isDisabled}>
        Submit
      </Button>
    </form>
  );
};

export default memo(CreateCarForm);
