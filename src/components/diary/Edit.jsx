import { useContext } from 'react'
import { DiaryDispatchContext } from './../../context/DiaryContext.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import useDiary from '../../hooks/useDiary'
import DiaryHeader from './DiaryHeader'
import Editor from './Editor'
import '../../asset/scss/common.css'
import FeatherIcon from 'feather-icons-react'

const Edit = () => {
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext)
  const {id}  = useParams()
  const data = useDiary(id)
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
      onDelete(id)
      navigate('/diary/main', { replace: true })
    }
  }

  const onSubmit = (data) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      const { date, content, emotionId } = data
      onUpdate(id, date, content, emotionId)
      navigate('/diary/main', { replace: true })
    }
  }

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>
  } else {
    return (
      <>
        <DiaryHeader
          title={'수정하기'}
          leftChild={
            <FeatherIcon
              className="button_return"
              icon="chevron-left"
              size="24"
              color="#9BA2A9"
              strokeWidth="2"
              onClick={goBack}
              type={'negative'}
            />
          }
          rightChild={
            <FeatherIcon
              className="button_delete"
              icon="trash-2"
              size="24"
              color="#9BA2A9"
              strokeWidth="2"
              onClick={onClickDelete}
              type={'negative'}
            />
          }
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </>
    )
  }
}
export default Edit
