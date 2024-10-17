import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Main from "../components/Main";
function Mains() {
  return (
    <>
      <Header />
      <main>
        <div className="contWrap">
          <Main />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Mains;
