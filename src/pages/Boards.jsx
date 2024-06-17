import React, { useState, useEffect } from 'react'
import SubTitle from '../components/common/SubTitle'
import SwitchMain from '../components/board/SwitchMain'
import { useLocation } from 'react-router-dom'

const Boards = () => {
  // 선택된 메뉴 상태
  const [selectedMenu, setSelectedMenu] = useState('')

  //navigate로 보낸 state 저장
  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.selectedMenu !== undefined) {
      setSelectedMenu(location.state.selectedMenu)
    }
  }, [location.state])

  // 현재 게시판 텍스트 동적으로 설정
  const currentBoardText =
    selectedMenu === '다이어트 정보' ? '다이어트 정보' : '사용자 게시판'

  const TitleWrap = { title: '커뮤니티', subTitle: currentBoardText }

  return (
    <>
      <SubTitle {...TitleWrap} />
      <SwitchMain
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
    </>
  )
}

export default Boards
