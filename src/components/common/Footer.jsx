import React from 'react'
import Logo from '../../asset/img/logo_txt.png'

const Footer = () => {
  return (
   <div id="footer">
    <div className="footer">
    <div className="inner">
        <h1 className="footer-logo">
            <img src={Logo} alt="로고" />
        </h1>
        <ul className="footer-menu">
            <li className="personal"><a href="#">개인정보처리방침</a></li>
            <li className="rule"><a href="#">이용약관</a></li>
        </ul>
        <p className="copy">COPYRIGHT @ HEALTHYLOG ALL RIGHTS RESERVED.</p>
    </div>
</div>
</div>
  )
}

export default Footer