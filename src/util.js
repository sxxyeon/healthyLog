// import emotion1 from "./asset/img/emotion1.svg";
// import emotion2 from "./asset/img/emotion2.svg";
// import emotion3 from "./asset/img/emotion3.svg";
import { Icon } from "@iconify/react";

export const getEmotionImgById = (emotionId) => {
  const emotion1 = (
    <Icon icon="mdi:checkbox-blank-circle-outline"  color="white" width="50" height="50"  />
  );
  const emotion2 = (
    <Icon icon="mdi:triangle-outline"   color="white" width="50" height="50" />
  );
  const emotion3 = (
    <Icon icon="mdi:close"   color="white" width="50" height="50"  />
  );
  const targetEmotionId = String(emotionId);
  switch (targetEmotionId) {
    case "1":
      return emotion1;
    case "2":
      return emotion2;
    case "3":
      return emotion3;
    default:
      return null;
  }
};
// emotion1
export const getFormattedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

export const emotionList = [
  {
    id: 1,
    img: getEmotionImgById(1),
  },
  {
    id: 2,
    img: getEmotionImgById(2),
  },
  {
    id: 3,
    img: getEmotionImgById(3),
  },
];

export const getMonthRangeByDate = (date) => {
  const beginTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getTime();
  const endTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  return { beginTimeStamp, endTimeStamp };
};
