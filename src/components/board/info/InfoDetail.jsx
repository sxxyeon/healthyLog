import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { InfoData } from '../../../hooks/InfoData'
import BtnNavi from './BtnNavi'

const InfoDetail = () => {
  const [infoArray, setInfoArray] = useState(InfoData)

  const editState = 'noEdit'

  const { id } = useParams() // URL에서 파라미터 받기

  // 특정 id의 항목만 가져오기
  const selectedBoard = infoArray.find((board) => board.id === parseInt(id, 10))

  const navigate = useNavigate()

  const moveToNext = () => {
    window.scrollTo(0, 0)
    navigate('/board/info/' + (parseInt(selectedBoard.id) + 1))
  }

  const moveToprev = () => {
    window.scrollTo(0, 0)
    navigate('/board/info/' + (parseInt(selectedBoard.id) - 1))
  }

  const moveToList = () => {
    navigate('/board', { state: { selectedMenu: '다이어트 정보' } })
  }

  const listBtn = (
    <button onClick={moveToList} className="btn btn04 sm-txt">
      목록으로
    </button>
  )
  return (
    <>
      <div className="detailBox">
        <div className="detailTitle">
          {/* 게시글 제목 */}
          <h2>{selectedBoard.title}</h2>
          {/* 목록 버튼 */}
          <div className="lintBtn">{listBtn}</div>
        </div>

        <hr />
        <div className="detailCreate">
          {/* 게시글 출처 */}
          <h3>출처 : {selectedBoard.createBy}</h3>
        </div>

        <div className="detailcontents">
          <div className="contentTextBox">
            {/* 머릿말 이미지 */}
            {selectedBoard.headText && (
              <img
                className="textImg"
                src={selectedBoard.imgSrc}
                alt="infoimg"
              />
            )}

            {/* 머릿말 텍스트 */}

            {selectedBoard.headText &&
              selectedBoard.headText
                .split('\n')
                .map((line, index) => <p key={index}>{line}</p>)}

            {/* 내용 */}
            {selectedBoard.contents.map((content, index) => (
              <div className="textBox" key={index}>
                <h5>{content.subTitle}</h5>
                <img className="textImg" src={content.imgSrc} alt="infoimg" />
                {/* 내용 텍스트 */}
                {content.text.split('\n').map((part, partIndex) => (
                  <p key={partIndex}>{part}</p>
                ))}
              </div>
            ))}

            {/* 마무리 */}
            {selectedBoard.footText &&
              selectedBoard.footText.split('\n').map((part) => <p>{part}</p>)}
            <br />
          </div>
        </div>
        <BtnNavi
          id={id}
          data={infoArray}
          moveToprev={moveToprev}
          moveToNext={moveToNext}
          moveToList={moveToList}
        />
      </div>
    </>
  )
}

export default InfoDetail
