import React, {
  useReducer,
  useRef,
  useEffect,
  useState,
  createContext,
} from 'react'
import axios from 'axios'

//일기장 mock데이터
const mockData = [
  {
    id: 'mock1',
    date: new Date('2024-01-22').getTime() - 1,
    content:
      "이곳에 일기를 작성할 수 있습니다.  '+'버튼으로 일기를 생성해보세요! ↗ ",
    emotionId: 1,
    img: './',
  },
  {
    id: 'mock2',
    date: new Date('2024-01-21').getTime() - 2,
    emotionId: 2,
    content:
      '아침에 눈오리를 봤다. 오늘점심은 오리훈제를 먹어야지 근처에 정말 맛있는 오리훈제집을 찾았다! 오리훈제 칼로리를 찾아보니 다이어트식품이 맞는거같아. 점심오리훈제는 정말 맛있었어!  저녁으로 새로생긴 피자를 먹어야겠다. 샐러드가 올라갔다면 괜찮지않을까? 오늘은 총 1620칼로리를 먹었다. 1600까지 더 힘내보자:) 오늘은 하체 근력운동을 해야겠다! 가기전에 쉐이크 만들어가는것 잊지말기',
  },
  {
    id: 'mock3',
    date: new Date('2024-01-21').getTime() - 3,
    emotionId: 3,
    content:
      '아침으로 먹은 비빔밥 정말 맛있었다. 다음에는 연어넉넉히 넣고 먹어야지 :) 점심 도시락은 그저그랬다. 저녁은 바나나로 마무리!',
  },
  {
    id: 'mock4',
    date: new Date('2023-12-21').getTime() - 4,
    emotionId: 1,
    content:
      '피클 아이스크림은 특이한 조합의 디저트로, 피클과 아이스크림을 함께 섭취하는 것입니다. 몇몇 사람들은 이 조합에 흥미를 느끼고 시도해보는데, 신선한 새로운 맛을 찾는 사람들에게는 특별한 경험이 될 수 있습니다. 다양한 음식 조합을 시도하는 것은 가끔 재미있는 발견을 할 수 있는데, 피클 아이스크림은 그 중 하나입니다!',
  },
]

function reducer(state, action) {
  let nextState
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE': {
      nextState = [action.data, ...state]
      break
    }
    case 'UPDATE': {
      nextState = state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      )
      break
    }
    case 'DELETE': {
      nextState = state.filter(
        (it) => String(it.id) !== String(action.targetId)
      )
      break
    }
    default: {
      return state
    }
  }
  return nextState
}

export const DiaryStateContext = createContext() // props drilling없이 일기State와 업데이트함수 useContext로 모든페이지에서 일기state를 꺼낼 수 있다.
export const DiaryDispatchContext = createContext() // 일기 State를 업데이트하는 on*3함수

const DiaryProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
    setIsLoading(false)
  }, [])
  const fetchData = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_JSON}/diary`)
    setData(resp.data)
  }
  const [data, setData] = useState([])
  console.log(data)

  const onCreate = async (date, content, emotionId) => {
    const options = {
      date: new Date(date).getTime(),
      content: content,
      emotionId: emotionId,
    }
    await axios.post(`${process.env.REACT_APP_JSON}/diary`, options)
  }

  const onUpdate = async (id, date, content, emotionId) => {
    const options = {
      date: new Date(date).getTime(),
      content: content,
      emotionId: emotionId,
    }
    await axios.put(`${process.env.REACT_APP_JSON}/diary/${id}`, options)
  }
  const onDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_JSON}/diary/${id}`)
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
