import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import SubTitle from '../../components/common/SubTitle'
// import '../asset/scss/Search_pw.scss';

const Search_pw = memo(() => {
  const navigate = useNavigate()
  const handleOnGoBack = () => {
    // 취소 버튼클릭 이벤트핸들러
    navigate(-1)
  }

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i
  const [result, setResult] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [userid, setUserid] = useState('')

  const handleClick = async () => {
    // 입력값이 하나라도 null이면 이동하지 않음
    if (username === '' || email === '') {
      alert('아이디와 이메일 입력하세요.')
      return
    } else {
      alert(
        `입력하신 이메일 ${email}(으)로 임시 비밀번호를 발송 했습니다. 로그인 화면으로 돌아갑니다.`
      )
      // 로그인 페이지로 이동
      window.location.href = '/auth/login'
    }
    // setFoundCredentials(`Username: ${email}`);
  }
  //형식에 맞지 않을 경우 아래 출력
  const emailCheck = (email) => {
    if (email.match(emailRegEx) === null) {
      setResult('이메일 형식을 확인해주세요')
      return
    } else {
      // 맞을 경우 출력
      setResult('이메일 형식이 맞아요')
    }
  }

  return (
    <>
      <div className="subTitle tc">
        <h4>비밀번호 찾기</h4>
        <p>이름과 아이디, 이메일을 입력해 주세요</p>
      </div>
      <div className="search_pw_wrapper">
        <div>
          <input
            placeholder="이름"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="search_name"
            type="text"
            maxLength="10"
            name="search_id_name"
          />
        </div>
        <div>
          <input
            placeholder="아이디"
            value={userid}
            required
            onChange={(e) => setUserid(e.target.value)}
            className="search_name"
            type="text"
            maxLength="10"
            name="search_id_name"
          />
        </div>
        <div className="search_email_wrapper">
          <input
            placeholder="이메일"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value)
              emailCheck(e.target.value)
            }}
            type="email"
          />
          <div className="result_wrapper">{result}</div>
        </div>
        <div className="btn_wrapper">
          <button type="button" onClick={handleOnGoBack}>
            이전
          </button>
          <button type="button" onClick={handleClick}>
            {' '}
            조회{' '}
          </button>
        </div>
      </div>
    </>
  )
})

export default Search_pw
