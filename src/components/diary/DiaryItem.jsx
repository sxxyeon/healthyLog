import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmotionImgById } from '../../util'
import FeatherIcon from 'feather-icons-react'
import { Icon } from '@iconify/react'

const DiaryItem = ({ id, emotionId, content, date }) => {
  const navigate = useNavigate()

  const modalBackground = useRef()
  const goEdit = () => {
    navigate(`/diary/edit/${id}`)
    document.body.style.overflowY = 'scroll'
  }

  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => {
    setModalOpen(true)
    document.body.style.overflowY = 'hidden'
  }
  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflowY = 'scroll'
  }
  return (
    <div className="DiaryItem">
      <div className="modal-open-btn" onClick={openModal}>
        <div className={['img_section', `img_section_${emotionId}`].join(' ')}>
          {getEmotionImgById(emotionId)}
        </div>
        <div className="info_section">
          <div className="date_wrapper">
            {new Date(parseInt(date)).toLocaleDateString()}
          </div>
          <div className="content_wrapper">{content}</div>
        </div>
      </div>
      {modalOpen && (
        <div
          className={'modal-container'}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false)
            }
          }}
        >
          <div className={'modal-content'}>
            <Icon
              onClick={closeModal}
              className={'modal-close-btn'}
              icon="ion:close"
              width="30px"
              stroke="#545454"
            />
            <div className={'cont'}>
              <div
                className={['img_section', `img_section_${emotionId}`].join(
                  ' '
                )}
              >
                {getEmotionImgById(emotionId)}
              </div>
              <div className="modal_info">
                <div className="date_wrapper">
                  {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className="content_wrapper">{content}</div>
              </div>
            </div>
            <FeatherIcon
              className="button_edit"
              icon="edit"
              size="24"
              color="#545454"
              strokeWidth="2"
              onClick={goEdit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(DiaryItem)
