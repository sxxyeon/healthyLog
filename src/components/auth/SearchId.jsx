import React, { useState, memo } from 'react'
import { useNavigate, Link } from "react-router-dom";
import SubTitle from '../../components/common/SubTitle';
// import '../asset/scss/Search_id.scss';


const Search_id = memo (() => {

  const navigate = useNavigate();

  const handleOnGoBack = () => { // 취소 버튼클릭 이벤트핸들러
    navigate(-1);
  };
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [foundCredentials, setFoundCredentials] = useState(null);
  const [result, setResult] = useState('');
  const handleClick = async () => {
    // 입력값이 하나라도 null이면 이동하지 않음
    if (username === '' || email === '') {
      alert('이름과 이메일을 입력하세요.');
      return;
    }
    setFoundCredentials(`ID: ${email}`);
  };

  //형식에 맞지 않을 경우 아래 출력
  const emailCheck = (email) => {
    if(email.match(emailRegEx)===null) {
      setResult('! 이메일 형식을 확인해주세요');
      return;
    }else{ // 맞을 경우 출력
      setResult('이메일 형식이 맞아요');
    }
  }
  //const titleWrap = {title:'아이디 찾기' , subTitle:"이름과 이메일을 입력해주세요"}

  return (
    <>
    <div className="subTitle tc">
      <h4>아이디 찾기</h4>
      <p>이름과 이메일을 입력해 주세요</p>
    </div>
    {/*  eslint-disable-next-line jsx-a11y/no-redundant-roles */}
    <form className='form-horizontal' role='form'>
      <div className='search_id_wrapper'>
        <div>
          <input placeholder='이름' value={username} className='search_name' required onChange={(e) => setUsername(e.target.value)} type='text' maxLength='10' name='search_id_name' />
        </div>
        <div className='search_email_wrapper'>
          <input
            type="email"
            // value={inputValue}
            onChange={(e) => {setEmail(e.target.value); emailCheck(e.target.value)}}
            placeholder="이메일"
            required
            value={email}
          />
          <div className='result_wrapper'>{result}</div>
         
        </div>

        <div className='btn_wrapper'>
          <button type='button' onClick={handleOnGoBack}> 이전 </button>
          <button type='button' onClick={handleClick}> 조회 </button>
        </div>
        {foundCredentials && <div className='foundId'>{foundCredentials}</div>}
        <Link className='linkWrapper' to="/auth/Search_pw"><span className='warnMark'>!</span>비밀번호를 잊었나요?</Link>
        {/* <Button  onClick={onClickPw}></Button> */}
      </div>
    </form>
    </>
  )
});

export default React.memo(Search_id)
