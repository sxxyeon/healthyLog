import React, { useState } from 'react'
import SubTitle from '../components/common/SubTitle'
import Join1 from '../components/auth/Join1'

const TitleWrap = {
  title: '약관동의',
  subTitle: '약관을 확인하시고 다음을 눌러주세요',
}

const Join1s = () => {
  return (
    <>
      <SubTitle {...TitleWrap} />
      <Join1 />
    </>
  )
}

export default Join1s
