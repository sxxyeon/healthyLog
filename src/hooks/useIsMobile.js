import React, { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 649);

  useEffect(() => {
    const resizeViewport = () => {
      setIsMobile(window.innerWidth <= 649);
    };

    window.addEventListener("resize", resizeViewport);
    return () => {
      window.removeEventListener("resize", resizeViewport);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
