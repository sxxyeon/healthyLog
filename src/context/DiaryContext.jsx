import React, {
  useReducer,
  useRef,
  useEffect,
  useState,
  createContext,
} from 'react'
import axios from 'axios'

export const DiaryStateContext = createContext() // props drilling없이 일기State와 업데이트함수 useContext로 모든페이지에서 일기state를 꺼낼 수 있다.
export const DiaryDispatchContext = createContext() // 일기 State를 업데이트하는 on*3함수

const DiaryProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  //console.log(data)

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_JSON}/diary`, {
      cache: 'no-store',
    })
    setData(resp.data)
    setIsLoading(false)
    
  }
  

  const onCreate = async (date, content, emotionId) => {
    const options = {
      date: new Date(date).getTime(),
      content: content,
      emotionId: emotionId,
    }
    await axios.post(`${process.env.REACT_APP_JSON}/diary`, options)
    window.location.reload()
    
  }

  const onUpdate = async (id, date, content, emotionId) => {
    const options = {
      date: new Date(date).getTime(),
      content: content,
      emotionId: emotionId,
    }
    await axios.put(`${process.env.REACT_APP_JSON}/diary/${id}`, options)
    fetchData()
    window.location.reload();
  }
  const onDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_JSON}/diary/${id}`)
    fetchData()
    window.location.reload()
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default DiaryProvider
