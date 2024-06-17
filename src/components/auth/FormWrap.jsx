import React from 'react'

const FormWrap = ({
  id,
  value,
  type,
  btype,
  onChange,
  msg,
  placeholder,
  classN,
  onClick,
  btnText,
  children,
}) => {
  return (
    <div className={`formWrap ${classN}`}>
      <form>
        <input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
        />

        {msg && <p className="msg">{msg}</p>}
        {onClick && (
          <button className="btn btn01" type={btype} onClick={onClick}>
            {btnText}
          </button>
        )}
        {children}
      </form>
    </div>
  )
}

export default FormWrap
