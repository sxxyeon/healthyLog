import React from "react";
import Board from "./Board";
import InfoList from "./info/InfoList";

const SwitchList = ({ selectedMenu }) => {
  let contentToDisplay;
  switch (selectedMenu) {
    case "사용자 게시판":
      contentToDisplay = <Board />;
      break;
    case "다이어트 정보":
      contentToDisplay = <InfoList />;
      break;
    default:
      contentToDisplay = <Board />;
      break;
  }
  return <div className="wrap">{contentToDisplay}</div>;
};

export default SwitchList;
