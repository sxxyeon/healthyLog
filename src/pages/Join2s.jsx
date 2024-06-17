import React from 'react'
import SubTitle from '../components/common/SubTitle'
import Join2 from '../components/auth/Join2'

const TitleWrap = { title: '정보입력', subTitle: '정보를 입력해주세요' }

const Join2s = () => {
  return (
    <>
      <SubTitle {...TitleWrap} />
      <Join2 />
    </>
  )
}

export default Join2s
