import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BtnBox = ({ text1, text2, func1, func2, nav1, nav2, disabled }) => {
  const nav = useNavigate()
  console.log(func2)
  return (
    <div className="btnBox">
      <button onClick={func1 !== undefined || null ? func1 : () => nav(nav1)}>{text1}</button>
      {disabled !== undefined || null ? (
        <button
          onClick={func2 !== undefined || null ? func2 : () => nav(nav2)}
          disabled={!disabled}
        >
          {text2}
        </button>
      ) : (
        <button onClick={func2 !== undefined || null ? func2 : () => nav(nav2)}>{text2}</button>
      )}
    </div>
  )
}

export default BtnBox
