import React from 'react'

const SubTitle = ({title,subTitle}) => {
  return (
    <div className="subTitle">
        <h4>{title}</h4>
        <p>{subTitle}</p>
    </div> 
  )
}

export default SubTitle;