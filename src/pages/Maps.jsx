import React from 'react'
import SubTitle from '../components/common/SubTitle'
import Map from './../components/map/Map'

const TitleWrap = {
  title: '내 주변 건강맛집',
  subTitle: '근처의 건강식을 찾아보세요',
}

const Maps = () => {
  return (
    <>
      <SubTitle {...TitleWrap} />
      <Map />
    </>
  )
}

export default Maps
