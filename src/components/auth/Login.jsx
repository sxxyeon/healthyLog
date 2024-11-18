import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "../../asset/img/logo_txt.png";
const Login = () => {
  return (
    <>
      <div className="subTitle tc">
        <img src={Logo} alt="logo" className="login_logo" />
      </div>
      <div className="loginWrap">
        <div className="inputBox">
          <input name="login" type="text" placeholder="아이디" />
          <input name="join" type="password" placeholder="패스워드" />
        </div>
        <div className="btnBox">
          <button type="button" className="login">
            <Link to="/">로그인</Link>
          </button>
          <button type="button" className="join">
            <Link to="/auth/join1">회원가입</Link>
          </button>
        </div>
        <div className="findLinkBox">
          <Link to="/auth/Search_id">아이디 찾기</Link>
          <Link to="/auth/Search_pw">비밀번호 찾기</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
