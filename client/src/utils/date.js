import dayjs from "dayjs";

export const FORMAT_DATE = (date) => {
  return dayjs(date).format("DD/MM/YY  hh:mm A");
};
