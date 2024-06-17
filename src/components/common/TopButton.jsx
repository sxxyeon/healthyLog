// TopButton.js
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 일정 이상 내려갔을 때 버튼을 나타내기
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`topButton ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <Icon icon="bx:bx-chevron-up" color="#fff" width="32" height="32" />
    </div>
  )
}

export default TopButton
