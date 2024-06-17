import React, { useState } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import SubTitle from '../components/common/SubTitle'
import Home from './../components/diary/Home'
import DiaryProvider from '../context/DiaryContext.jsx'
const TitleWrap = {
  title: '식단일기',
  subTitle: '오늘의 식단을 기록으로 남겨보세요',
}

const Diarys = () => {
  return (
    <>
      <SubTitle {...TitleWrap} />
      <DiaryProvider>
        <Home />
      </DiaryProvider>
    </>
  )
}

export default Diarys
