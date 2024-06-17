import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AgreeChk from './AgreeChk'
import BtnBox from './BtnBox'
import Panel from './Panel'

const Join1 = () => {
  //뒤로가기
  

  const [allAgreed, setAllAgreed] = useState(false)
  const [agreements, setAgreements] = useState({
    serviceAgrd: false,
    personalAgrd: false,
    smsAgrd: false,
    emailAgrd: false,
  })
  // 필수동의 체크 여부 확인
  const isValid = agreements.serviceAgrd && agreements.personalAgrd

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target
    setAgreements((prevAgreements) => ({
      ...prevAgreements,
      [name]: checked,
    }))
    const allChecked = Object.values({
      ...agreements,
      [name]: checked,
    }).every((value) => value === true)
    setAllAgreed(allChecked)
  }

  const handleAllAgreementChange = (e) => {
    const { checked } = e.target
    setAgreements((prevAgreements) =>
      Object.keys(prevAgreements).reduce(
        (newAgreements, agreementsKey) => ({
          ...newAgreements,
          [agreementsKey]: checked,
        }),
        {}
      )
    )
    setAllAgreed(checked)
  }
  return (
    <>
      <div className="joinWrap">
        <Panel
          title={'서비스 이용동의 '}
          mark={'필수'}
          content={
            <>
              <AgreeChk
                id={'agrdAll'}
                checked={allAgreed}
                onChange={handleAllAgreementChange}
                title={'필수 이용동의 및 선택 이용동의에 모두 동의합니다'}
              />
              <AgreeChk
                id={'serviceAgrd'}
                required
                checked={agreements.serviceAgrd}
                onChange={handleAgreementChange}
                title={'서비스 이용약관 동의'}
              />
              <AgreeChk
                id={'personalAgrd'}
                required
                checked={agreements.personalAgrd}
                onChange={handleAgreementChange}
                title={'개인정보 수집 및 이용동의'}
              />
            </>
          }
        />
        <Panel
          title={`광고성 정보 전송을 위한
          \r\n
          개인정보 수집이용 동의 `}
          mark={'선택'}
          content={
            <>
              <AgreeChk
                id={'smsAgrd'}
                required
                checked={agreements.smsAgrd}
                onChange={handleAgreementChange}
                title={'이벤트/쇼핑 혜택 sms 수신 동의'}
              />
              <AgreeChk
                id={'emailAgrd'}
                required
                checked={agreements.emailAgrd}
                onChange={handleAgreementChange}
                title={'이벤트/쇼핑 혜택 이메일 수신동의'}
              />
            </>
          }
          notice={
            '귀하는 동의 거부 권리가 있으며, 동의 거부를 하셔도 본 서비스 가입 및 이용이 가능합니다.'
          }
        />
        <BtnBox text1={'이전'} text2={'다음'} nav1={-1} nav2={'/auth/join2'} disabled={isValid} />
      </div>
    </>
  )
}

export default Join1
