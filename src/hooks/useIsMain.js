import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useIsMain = () => {
  const [isMain, setIsMain] = useState(false);
  const { pathname } = useLocation();
  console.log(pathname);
  useEffect(() => {
    const detectiveMain = () => {
      setIsMain(pathname === "/");
    };
    detectiveMain();
  }, [pathname]);
  return isMain;
};

export default useIsMain;
