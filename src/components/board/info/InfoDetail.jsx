import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InfoData } from "../../../hooks/InfoData";
import BtnNavi from "./BtnNavi";

const InfoDetail = () => {
  const [infoArray, setInfoArray] = useState(InfoData);

  const editState = "noEdit";

  const { id } = useParams(); // URL에서 파라미터 받기

  // 특정 id의 항목만 가져오기
  const selectedBoard = infoArray.find(
    (board) => board.id === parseInt(id, 10)
  );

  const navigate = useNavigate();

  const moveToNext = () => {
    window.scrollTo(0, 0);
    navigate("/board/info/" + (parseInt(selectedBoard.id) + 1));
  };

  const moveToprev = () => {
    window.scrollTo(0, 0);
    navigate("/board/info/" + (parseInt(selectedBoard.id) - 1));
  };

  const moveToList = () => {
    navigate("/board", { state: { selectedMenu: "다이어트 정보" } });
  };

  return (
    <>
      <div className="detailBoard">
        <h3 className="tit">{selectedBoard.title}</h3>
        <h4 className="createBy">출처 : {selectedBoard.createBy}</h4>

        <div className="content">
          <div className="conts">
            {/* 머릿말 이미지, 텍스트 */}
            {selectedBoard.headText && (
              <>
                <img
                  className="titImg"
                  src={selectedBoard.imgSrc}
                  alt="다이어트 관련 정보"
                />
                {selectedBoard.headText.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </>
            )}

            {/* 내용 */}
            {selectedBoard.contents.map((content, index) => (
              <div className="textBox" key={index}>
                <h5>{content.subTitle}</h5>
                <img src={content.imgSrc} alt="다이어트 관련 정보" />
                {/* 내용 텍스트 */}
                {content.text.split("\n").map((part, partIndex) => (
                  <p key={partIndex}>{part}</p>
                ))}
              </div>
            ))}

            {/* 마무리 */}
            {selectedBoard.footText &&
              selectedBoard.footText.split("\n").map((part) => <p>{part}</p>)}
            <br />
          </div>
        </div>
        <BtnNavi
          id={id}
          data={infoArray}
          moveToprev={moveToprev}
          moveToNext={moveToNext}
          moveToList={moveToList}
        />
      </div>
    </>
  );
};

export default InfoDetail;
