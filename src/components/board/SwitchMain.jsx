import React, { useState, useEffect } from "react";
import SwitchMenu from "./SwitchMenu";
import SwitchList from "./SwitchList";
import { useLocation } from "react-router-dom";

const SwitchMain = ({ selectedMenu, setSelectedMenu }) => {
  // 선택 동작
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <div className="switchcontailner">
        <SwitchMenu
          selectedMenu={selectedMenu}
          handleMenuClick={handleMenuClick}
        />
      </div>
      <div>
        <SwitchList selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default SwitchMain;
