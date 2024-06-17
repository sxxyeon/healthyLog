import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import FeatherIcon from "feather-icons-react";
import logo from "../asset/img/logo_txt_w.png"
function Main() {
  const [searchText, setSearchText] = useState("");
  const nav = useNavigate();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmitSrch = (e) =>{
    e.preventDefault()
    nav(`/result`, { state: { searchText } });
    console.log("검색어:", searchText);
  }

  return (
    <>
      <div className="mainContainer">
        <div className="mainBox">
          <h1 className="mainLogo"><img src={logo} alt="로고" /></h1>
          <h4>내가 먹을 음식이 궁금하다면?</h4>
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
        </div>
      </div>
    </>
  );
}

export default Main;
