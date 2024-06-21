export const between = (v: number, min: number, max: number) => {
  "worklet";
  return v >= min && v <= max;
};

export const vec = (x: number, y: number) => {
  "worklet";
  return { x, y };
};
