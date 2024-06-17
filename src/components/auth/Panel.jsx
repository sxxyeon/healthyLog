import React from 'react'

const Panel = ({ title, mark, content, notice }) => {
  return (
    <div className="panel">
      <div className="tit">
        <h5>
          {title} <span className="primary">{`(${mark})`}</span>
        </h5>
      </div>
      <ul>{content}</ul>
      { notice? (<p>{notice}</p>):(null)}
    </div>
  )
}

export default Panel
