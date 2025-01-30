export enum ModifiedTypeEnum {
  position = "position",
  rotation = "rotation",
}

export type TCar = {
  id: string;
  fill: string;
  x: number;
  y: number;
  carNumber: string;
  rotation: number;
  isNew?: boolean;
  type?: ModifiedTypeEnum
};

