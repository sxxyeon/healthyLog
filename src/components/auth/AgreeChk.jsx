import React from 'react'

const AgreeChk = ({id, checked, onChange, required, title}) => {
  return (
    <li>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}></label>
      <span>{title}</span>
    </li>
  )
}

export default AgreeChk
