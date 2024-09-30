import React from "react";
import { useNavigate } from "react-router-dom";
const SwitchMenu = ({ selectedMenu, handleMenuClick }) => {
  const navigate = useNavigate();
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    handleMenuClick(selectedValue);
  };
  //글쓰기 이벤트 핸들러
  const moveToWrite = () => {
    navigate("/write");
  };

  return (
    <div className="menu_top">
      <form>
        <select
          className="switchMenu"
          name="menu"
          value={selectedMenu}
          onChange={handleChange}
        >
          <option value="사용자 게시판">사용자 게시판</option>
          <option value="다이어트 정보">다이어트 정보</option>
        </select>
      </form>
      <button
        className="btn btn01"
        style={{ height: "40px" }}
        onClick={moveToWrite}
      >
        글 쓰기
      </button>
    </div>
  );
};

export default SwitchMenu;
