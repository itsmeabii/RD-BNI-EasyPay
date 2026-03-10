export const formatDate = (s: string): string => {
  const [m, d, y] = s.split("/");
  return new Date(+y, +m - 1, +d).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
};

export const parseDate = (s: string): number => {
  const [m, d, y] = s.split("/");
  return new Date(+y, +m - 1, +d).getTime();
};