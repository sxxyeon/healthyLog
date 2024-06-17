import React from 'react'
import SubTitle from '../components/common/SubTitle'
import Calculator from '../components/Calculator'

const TitleWrap = {
  title: '칼로리 계산기',
  subTitle: '선택한 음식의 총 열량을 확인하세요',
}

function Calculators() {
  return (
    <>
      <SubTitle {...TitleWrap} />
      <Calculator />
    </>
  )
}

export default Calculators
