import React from "react";
import { getEmotionImgById } from "../../util";

const EmotionItem = ({ id, emotionId, name, onClick, isSelected }) => {
  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={handleOnClick}
    >
      {getEmotionImgById(id)}
      <span>{name}</span>
    </div>
  );
};
export default React.memo(EmotionItem);
