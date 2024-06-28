import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Main from '../components/Main'
import salad from '../asset/img/salad.png'
//import MainLink from "../components/mainLink";

function Mains() {
  return (
    <>
      <Header />
      <div className="bgWrap">
        <div className="circle"></div>
        <div className="b_circle"></div>
        <div className="contWrap main">
          <Main />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Mains
