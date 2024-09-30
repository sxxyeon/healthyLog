import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FeatherIcon from "feather-icons-react";
import logo from "../asset/img/logo_txt_w.png";
import salad from "../asset/img/salad_mobile.png";

function Main() {
  const [searchText, setSearchText] = useState("");
  const nav = useNavigate();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmitSrch = (e) => {
    e.preventDefault();
    nav(`/result`, { state: { searchText } });
    console.log("검색어:", searchText);
  };

  return (
    <>
      <div className="mainContainer">
        <motion.div
          className="bg_img"
          initial={{ x: `-50%`, y: 0 }} // 초기 위치
          animate={{
            y: [0, 20, 0], // 위아래로 30px 움직임
            x: "-50%", // x 위치 수동 설정 (translateX와 결합)
          }}
          transition={{
            duration: 2, // 애니메이션 지속 시간
            ease: "easeInOut", // 부드러운 애니메이션
            times: [0, 0.5, 1], // 각 단계의 비율 설정
            repeat: Infinity, // 무한 반복
            repeatType: "loop", // 반복 방식
          }}
        >
          <img src={salad} alt="" />
        </motion.div>

        <div className="mainBox">
          <h1 className="mainLogo">
            <img src={logo} alt="로고" />
          </h1>
          <h4>내가 먹을 음식이 궁금하다면?</h4>
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{
              type: "spring", // duratin 무시 속성
              stiffness: 60, //강성 - 느리게 속도가능.
              damping: 12, //강쇠 - 흔들림 설정가능
            }}
          >
            <form onSubmit={onSubmitSrch}>
              <input
                className="mainSearchBox"
                type="text"
                value={searchText}
                onChange={handleInputChange}
              />
              <button className="mainImgButton" onClick={onSubmitSrch}>
                <FeatherIcon icon="search" size="30" stroke="#fd7b54" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Main;
