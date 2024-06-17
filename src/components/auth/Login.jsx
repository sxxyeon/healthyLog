import React from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Logo from '../../asset/img/logo_txt.png'
const Login = () => {
  return (
    <>
        <div className="subTitle tc">
        <img src={Logo} alt="" className='login_logo'/>
            {/* <h4 className='primary'>LOGO</h4> */}
        </div>
        <div className="loginWrap">
            <div className="inputBox">
                <input name="login" type="text" placeholder='아이디'/>
                <input name="join" type="password" placeholder='패스워드'/>
            </div>
            <div className="btnBox clearfix">
                <Link to="/"><button type='button' className='login'>로그인</button></Link>
                <Link to="/auth/join1"><button type='button' className='join'>회원가입</button></Link>
            </div>
            <div className="findLinkBox clearfix">
                <Link to="/auth/Search_id">아이디 찾기</Link>
                <Link to="/auth/Search_pw">비밀번호 찾기</Link>
            </div>
        </div>
    </>
  )
}

export default Login;