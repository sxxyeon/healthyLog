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
    <>
      <SwitchMenu
        selectedMenu={selectedMenu}
        handleMenuClick={handleMenuClick}
      />

      <SwitchList selectedMenu={selectedMenu} />
    </>
  );
};

export default SwitchMain;
