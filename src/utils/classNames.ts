type TMods = Record<string, boolean>;

export const classNames = (
  cls: string,
  mods: TMods = {},
  additional: string[] = []
): string => {
  const modsArray: string[] = Object.entries(mods).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc.push(key);
      }
      return acc;
    },
    [] as string[]
  );

  const additionalArray = additional.filter(Boolean);

  return [cls, ...modsArray, ...additionalArray].join(" ");
};
