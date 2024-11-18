import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { Icon } from "@iconify/react";
import { scrollToTop } from "./common/TopButton";
const Result = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const { searchText = "" } = state || {}; // 가져온 검색어
  const [keyword, setKeyword] = useState(searchText || ""); // 검색어
  const [result, setResult] = useState([]); // 결과 식품배열
  const [checkedItem, setCheckedItem] = useState([]); // 체크된 식품 배열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [resultCount, setResultCount] = useState(0); // 전체 항목 갯수
  const [paginationStart, setPaginationStart] = useState(1); // 페이지네이션 시작 페이지

  const API_KEY = process.env.REACT_APP_DATA;
  const url = `${process.env.REACT_APP_DATA_URL}serviceKey=${API_KEY}&FOOD_NM_KR=${keyword}&numOfRows=20&pageNo=${currentPage}&type=json`;

  useEffect(() => {
    fetchData();
    scrollToTop();
  }, [currentPage]);

  useEffect(() => {
    // result 값이 변경될 때마다 pagination을 다시 생성
    if (result.length > 0) {
      setTotalPages(Math.ceil(resultCount / 20)); // 20개씩 보여줌
    }
  }, [result, resultCount]);

  const fetchData = async () => {
    const resp = await axios.get(url);
    const data = await resp.data?.body?.items;
    const uniqueData = Array.from(
      new Map(data?.map((item) => [item.FOOD_NM_KR, item])).values()
    );
    setResult(uniqueData);
    const totalCount = resp?.data?.body?.totalCount || 1;
    setResultCount(totalCount); // 총 검색결과 수

    setTotalPages(Math.ceil(totalCount / 20)); // 페이지 수
  };
  const onChangeChk = (foodInfo) => {
    const isChecked = {
      name: foodInfo.FOOD_NM_KR,
      kcal: foodInfo.AMT_NUM1,
      isClicked: !foodInfo.isClicked,
    };

    // 체크된 항목이 이미 있는지 확인
    const index = checkedItem.findIndex(
      (item) => item.name === isChecked.name && item.kcal === isChecked.kcal
    );

    if (index !== -1) {
      // 이미 체크된 항목이 있으면 배열에서 제거
      setCheckedItem((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      // 체크된 항목이 없으면 배열에 추가
      setCheckedItem((prev) => [...prev, isChecked]);
    }
  };
  // 검색어 변경
  const onChangeInput = (e) => {
    setKeyword(e.target.value);
  };

  // 재검색 시 데이터 재패치
  const onResearch = (e) => {
    e.preventDefault();
    fetchData();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    setPaginationStart(1);
  };

  // pagination 생성
  const renderPagination = () => {
    if (result.length === 0) return null; // 결과가 없으면 Pagination을 렌더링하지 않음

    const pages = [];
    const startPage = paginationStart;

    for (let i = startPage; i < startPage + 10 && i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => setCurrentPage(i)}
          className={i === currentPage ? `selected` : ``}
        >
          {i}
        </li>
      );
    }

    return (
      <ul className="pagination">
        {paginationStart > 1 && (
          <li
            onClick={() => {
              setPaginationStart(paginationStart - 10);
              setCurrentPage(paginationStart - 1);
            }}
          >
            <FeatherIcon
              className="button_return"
              icon="chevron-left"
              size="20"
              stroke="#aaa7b4"
              strokeWidth="1"
            />
          </li>
        )}
        {pages}
        {paginationStart + 10 <= totalPages && (
          <li
            onClick={() => {
              setPaginationStart(paginationStart + 10);
              setCurrentPage(paginationStart + 10);
            }}
          >
            <FeatherIcon
              className="button_return"
              icon="chevron-right"
              size="20"
              stroke="#aaa7b4"
              strokeWidth="1"
            />
          </li>
        )}
      </ul>
    );
  };

  const handleChange = async () => {
    if (!Array.isArray(checkedItem)) {
      console.error("checkedItem이 배열이 아닙니다");
      return;
    }

    for (const item of checkedItem) {
      await axios.post(`${process.env.REACT_APP_JSON}/checkedItems`, item);
    }
    nav("/calculators");
  };

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
            <FeatherIcon icon="search" size="30" stroke="#aaa7b4" />
          </button>
        </form>
      </div>

      {keyword.length > 0 ? (
        result.length > 0 ? (
          <>
            <div className="foodList">
              {result.map((item, idx) => (
                <div key={idx} className="foodBox panel">
                  <input
                    type="checkbox"
                    onChange={() => onChangeChk(item)}
                    checked={checkedItem.some(
                      (checked) =>
                        checked.name === item.FOOD_NM_KR &&
                        checked.kcal === item.AMT_NUM1
                    )}
                  />
                  <div className="foodInfo">
                    <h5>{item.FOOD_NM_KR}</h5>
                    <div className="props">
                      <div>
                        <p>칼로리 : {Math.round(item.AMT_NUM1)} kcal</p>
                        <p>단백질 : {Math.round(item.AMT_NUM3)} g</p>
                        <p>당류 : {Math.round(item.AMT_NUM8)} mg</p>
                      </div>
                      <div>
                        <p>탄수화물 : {Math.round(item.AMT_NUM7)} g</p>
                        <p>지방 : {Math.round(item.AMT_NUM4)} g</p>
                        <p>나트륨 : {Math.round(item.AMT_NUM14)} mg</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {renderPagination()}
          </>
        ) : (
          keyword.trim() !== "" && (
            <p className="noResult">"{keyword}" 의 검색결과가 없습니다.</p>
          )
        )
      ) : (
        <p className="noResult">검색어를 입력해 주세요.</p>
      )}
      <button className="prevButton" onClick={handleChange}>
        <Icon icon="ph:calculator" width="40px" />
      </button>
    </div>
  );
};

export default Result;
