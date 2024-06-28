import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import FeatherIcon from 'feather-icons-react'
import { Icon } from '@iconify/react'
import { scrollToTop } from './common/TopButton';
const Result = () => {
  const nav = useNavigate()
  const { state } = useLocation()
  const { searchText } = state // 가져온 검색어
  const [keyword, setKeyword] = useState(searchText || '') // 검색어
  const [result, setResult] = useState([]) // 결과 식품배열
  const [checkedItem, setCheckedItem] = useState([]) // 체크된 식품 배열
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [totalPages, setTotalPages] = useState(1) // 전체 페이지 수
  const [resultCount, setResultCount] = useState(0) // 전체 항목 갯수
  const [paginationStart, setPaginationStart] = useState(1) // 페이지네이션 시작 페이지

  //console.log(searchText)
  const API_KEY =
    '9tU2UpezZQbW38%2BHIPNxKiHXh6OKq8l%2BsEDAigS44XRh4G1C4IFJ%2BQ3RkD9ntfGT%2FiAqdS%2FkYL%2BMu2NprtKkHQ%3D%3D'
  const url = `https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?serviceKey=${API_KEY}&desc_kor=${keyword}&numOfRows=20&pageNo=${currentPage}&type=json` //api 주소
  //console.log(currentPage)
  useEffect(() => {
    fetchData()
    scrollToTop()
  }, [currentPage])

  useEffect(() => {
    // result 값이 변경될 때마다 pagination을 다시 생성
    if (result.length > 0) {
      setTotalPages(Math.ceil(resultCount / 20)) // 20개씩 보여줌
    }
  }, [result, resultCount])

  const fetchData = async () => {
    const resp = await axios.get(url)
    const data = await resp?.data?.body?.items
    console.log(resp?.data?.body)
    const uniqueData = Array.from(
      new Map(data?.map((item) => [item.DESC_KOR, item])).values()
    ) // 공부 필요
    setResult(uniqueData)
    const totalCount = resp?.data?.body?.totalCount || 1
    setResultCount(totalCount) // 총 검색결과 수

    setTotalPages(Math.ceil(totalCount / 20)) // 페이지 수
  }
  console.log(result)
  const onChangeChk = (foodInfo) => {
    console.log(foodInfo.NUTR_CONT1)
    const isChecked = {
      name: foodInfo.DESC_KOR,
      kcal: foodInfo.NUTR_CONT1,
      isClicked: !foodInfo.isClicked,
    }

    // 체크된 항목이 이미 있는지 확인
    const index = checkedItem.findIndex(
      (item) => item.name === isChecked.name && item.kcal === isChecked.kcal
    )
    let updatedCheckedItem
    if (index !== -1) {
      // 이미 체크된 항목이 있으면 배열에서 제거
      setCheckedItem((prev) => prev.filter((_, idx) => idx !== index))
    } else {
      // 체크된 항목이 없으면 배열에 추가
      setCheckedItem((prev) => [...prev, isChecked])
    }
  }
  // 검색어 변경
  const onChangeInput = (e) => {
    setKeyword(e.target.value)
  }

  // 재검색 시 데이터 재패치
  const onResearch = (e) => {
    e.preventDefault()
    fetchData()
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
    setPaginationStart(1)
  }

  // pagination 생성
  const renderPagination = () => {
    if (result.length === 0) return null // 결과가 없으면 Pagination을 렌더링하지 않음

    const pages = []
    const startPage = paginationStart

    for (let i = startPage; i < startPage + 10 && i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => setCurrentPage(i)}
          className={i === currentPage ? `selected` : ``}
        >
          {i}
        </li>
      )
    }

    return (
      <ul className="pagination">
        {paginationStart > 1 && (
          <li
            onClick={() => {
              setPaginationStart(paginationStart - 10)
              //console.log(paginationStart)
              setCurrentPage(paginationStart - 1)
            }}
          >
            <FeatherIcon
              className="button_return"
              icon="chevron-left"
              size="15"
              fill="#333"
              strokeWidth="1"/>
          </li>
        )}
        {pages}
        {paginationStart + 10 <= totalPages && (
          <li onClick={() => {setPaginationStart(paginationStart + 10)
            setCurrentPage(paginationStart + 10)
          }}>
            <FeatherIcon
              className="button_return"
              icon="chevron-right"
              size="15"
              fill="#333"
              strokeWidth="1"/>
          </li>
        )}
      </ul>
    )
  }

  const handleChange = async () => {
    if (!Array.isArray(checkedItem)) {
      console.error('checkedItem is not an array.')
      return
    }

    for (const item of checkedItem) {
      const options = {
        name: item.name,
        kcal: item.kcal,
        isClicked: item.isClicked,
      }

      const resp = await axios.post(
        `${process.env.REACT_APP_JSON}/checkedItems`,
        options
      )
      console.log('서버 응답:', resp.data) // 서버 응답 확인

      // 필요에 따라 서버 응답을 처리하거나 다른 로직을 추가할 수 있음
    }

    nav('/calculators')
  }

  return (
    <div className="searchContainer">
      <div className="searchBox">
        <form>
          <input
            className="foodSearch"
            type="text"
            value={keyword}
            onChange={onChangeInput}
          />
          <button className="imgButton" onClick={onResearch}>
            <FeatherIcon icon="search" size="40" stroke="#fd7b54" />
          </button>
        </form>
      </div>

      {keyword.length > 0 ? (
        result.length > 0 ? (
          <>
            <div className="foodBox">
              {result.map((item, idx) => (
                <div key={idx} className="foodList panel">
                  <input
                    type="checkbox"
                    onChange={() => onChangeChk(item)}
                    checked={checkedItem.some(
                      (checked) =>
                        checked.name === item.DESC_KOR &&
                        checked.kcal === item.NUTR_CONT1
                    )}
                  />
                  <div className="searchResult">
                    <h2>{item.DESC_KOR}</h2>
                    <div className="ingredient">
                      <div className="ingredient1">
                        <p>칼로리 : {Math.round(item.NUTR_CONT1)} kcal</p>
                        <p>단백질 : {Math.round(item.NUTR_CONT3)} g</p>
                        <p>당류 : {Math.round(item.NUTR_CONT5)} mg</p>
                      </div>
                      <div className="ingredient2">
                        <p>탄수화물 : {Math.round(item.NUTR_CONT2)} g</p>
                        <p>지방 : {Math.round(item.NUTR_CONT4)} g</p>
                        <p>나트륨 : {Math.round(item.NUTR_CONT6)} mg</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {renderPagination()}
          </>
        ) : (
          keyword.trim() !== '' && (
            <p className="noResult">"{keyword}" 의 검색결과가 없습니다.</p>
          )
        )
      ) : (
        ''
      )}
      <button className="prevButton" onClick={handleChange}>
        <Icon icon="ph:calculator" width="50px" />
      </button>
    </div>
  )
}

export default Result
