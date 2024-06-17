import React from 'react'
import SubTitle from '../components/common/SubTitle'

const TitleWrap = {
  title: '페이지를 찾을 수 없습니다',
  subTitle: '뒤로가기를 이용해주세요',
}
const NotFound = () => {
  return <SubTitle {...TitleWrap} />
}

export default NotFound
