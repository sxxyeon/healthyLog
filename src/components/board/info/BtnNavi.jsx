import React from 'react'
import { Icon } from '@iconify/react'

const BtnNavi = ({
  id,
  data,
  moveToprev,
  moveToNext,
  moveToUpdate,
  deleteNote,
  moveToList,
}) => {
  return (
    <div className="detailBtn">
      <div className="moveBtn">
        {id > data[0].id && (
          <button onClick={moveToprev}>
            <Icon
              icon="ion:arrow-back-circle-outline"
              width="35px"
              color="#9BA2A9"
            />
          </button>
        )}
        {id < data[data.length - 1].id && (
          <button onClick={moveToNext}>
            <Icon
              icon="ion:arrow-forward-circle-outline"
              width="35px"
              color="#9BA2A9"
            />
          </button>
        )}
      </div>
      <div className="moveBtn2">
        {moveToUpdate && (
          <button onClick={moveToUpdate} className="btn btn01 sm-txt">
            수정하기
          </button>
        )}
        {deleteNote && (
          <button onClick={() => deleteNote(id)} className="btn btn02 sm-txt">
            삭제하기
          </button>
        )}
        {moveToList && (
          <button onClick={moveToList} className="btn btn04 sm-txt">
            목록으로
          </button>
        )}
      </div>
    </div>
  )
}

export default BtnNavi
