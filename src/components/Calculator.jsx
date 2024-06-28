import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { Icon } from '@iconify/react'
import axios  from 'axios';

const Calculator = React.memo((checkBox) => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state || {}
  const { searchText } = state // 가져온 검색어
  const [initialData,setInitialData] = useState([])
  const [keyword, setKeyword] = useState(searchText || '') // 검색어

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () =>{
    const resp = await axios.get(`${process.env.REACT_APP_JSON}/checkedItems`)
    console.log(resp)
    setInitialData(resp.data)
  }

  // 성별 / 나이 / 키 / 몸무게 계산 식

  const [body, setBody] = useState({
    gender: '',
    age: '',
    cm: '',
    kg: '',
    kcal: '',
  })
  const [bmiData, setBmiData] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target
    const regex = /^\d*$/

    if (name === 'gender') {
      setBody((prev)=>({...prev, gender: value}))
    }
    

    else if (value === '' || regex.test(value)) {
      setBody((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const { gender, age, cm, kg, kcal } = body

  console.log(initialData)

  // 계산 버튼
  const onClick = () => {
    if (gender === '') {
      alert('성별 확인해주세요.')
    } else if (age === '') {
      alert('나이 칸이 비어 있습니다. 확인해주세요.')
    } else if (cm === '') {
      alert('키 칸이 비어 있습니다. 확인해주세요.')
    } else if (kg === '') {
      alert('몸무게 칸이 비어 있습니다. 다시 확인해주세요.')
    } else {
      gender === 'male' ? (
        <p>
          {setBmiData(Math.round(664.7 + 13.75 * kg + 5 * cm - 6.76 * age))}
        </p>
      ) : (
        <p>
          {setBmiData(Math.round(655.1 + 9.56 * kg + 1.85 * cm - 4.68 * age))}
        </p>
      )
    }
  }

  // 페이지 넘어오면 목표인풋에 커서 올리기
  const inputRef = useRef(null)


  // 배열 kcal 합치기 # 복습필요
  const kcalTotal = initialData.reduce(
    (total, item) => total + parseInt(item.kcal),
    0
  )
  // 리스트 삭제 버튼 # 복습필요
  const onDelete = async(index) => {
    const itemToDelete = initialData[index];
    try {
      await axios.delete(`${process.env.REACT_APP_JSON}/checkedItems/${itemToDelete.id}`)
      setInitialData((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  //목표 부족 or 넘침
  const enoughText =
    kcalTotal > parseInt(kcal) ? <p>목표 달성 실패!</p> : <p>목표 달성!</p>
  //목표 부족 or 넘침 이모지
  const enoughEmoji =
    kcalTotal > parseInt(kcal) ? (
      <span className="emoji1">
        <FeatherIcon icon="frown" size="64" />
      </span>
    ) : (
      <span className="emoji2">
        <FeatherIcon icon="smile" size="64" />
      </span>
    )

  const handleResult = (e) => {
    //localStorage.setItem('checkBox', JSON.stringify(mokData))
    
    navigate('/result',{state:{searchText:''}})
  }

  return (
    <>
      <div className="calcWrap">
        <div className="bmiWrap pt40">
          <p className="tit">나의 일일 권장 섭취칼로리를 확인해보세요</p>
          <ul className="bmi clearfix">
            <li>
              <p className="label">성별</p>
              <select
                name="gender"
                id="gender"
                value={gender}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </li>
            <li>
              <p className="label">나이</p>
              <input
                className="age"
                type="text"
                name = 'age'
                value={age}
                onChange={handleChange}
              />
            </li>
            <li>
              <p className="label">키</p>
              <input
                className="cm"
                type="text"
                name = 'cm'
                value={cm}
                onChange={handleChange}
              />
            </li>
            <li>
              <p className="label">몸무게</p>
              <input
                className="kg"
                type="text"
                value={kg}
                name = 'kg'
                onChange={handleChange}
              />
            </li>
            <li>
              <button className="enterBtn" onClick={onClick}>
                계산하기
              </button>
            </li>
          </ul>
          <p className="result">
            {/* 기본값 0 세팅 수정 */}
            <span className="bmiResult">{bmiData === '' ? 0 : bmiData}</span>
            kcal
          </p>
        </div>

        <div className="kcalGoal panel">
          <p className="tit">목표한 하루 섭취 칼로리를 입력해주세요</p>
          <div className="inputBox">
            <input
              ref={inputRef}
              type="text"
              value={kcal}
              name = 'kcal'
              placeholder={bmiData}
              onChange={handleChange}
            />
            <p>kcal</p>
          </div>
        </div>
      </div>

      <div className="kcalList">
        <ul>
          {initialData?.length > 0 ? (
            initialData.map((item, index) => {
              return (
                <li key={index} className="panel">
                  <span className="leftListText">{item.name}</span>
                  <span className="rightListText">
                    {Math.round(item.kcal)} kcal
                  </span>
                  <p className="liBtn" onClick={() => onDelete(index)}>
                    <Icon className="icon" icon="ion:close" width="34px" />
                  </p>
                </li>
              )
            })
          ) : (
            <p className="noResult">선택한 음식이 없습니다.</p>
          )}
        </ul>
      </div>
      <div className="emojiBox">
        <div className="emoji">
          {enoughEmoji}
          {enoughText}
        </div>
        <p>
          총 <span className="kcalText">{kcalTotal}</span> kcal
        </p>
      </div>
      <div>
        <button className="resultBtn" onClick={handleResult}>
          <FeatherIcon icon="search" size="50" stroke="#fff" />
        </button>
      </div>
    </>
  )
})

export default Calculator
