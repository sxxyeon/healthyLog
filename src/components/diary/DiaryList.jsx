import { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
// import plus from "./img/plus.svg";
import FeatherIcon from 'feather-icons-react';

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const DiaryList = ({ data }) => {
  // 정렬  
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest"); // state 값 최신순으로 변경
  const [sortedData, setSortedData] = useState([]); // 정렬된 일기 데이터저장

  useEffect(() => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return Number(b.date) - Number(a.date); //data와 type 저장 후 Number메서드로 형변환 후 정렬
      } else {
        return Number(a.date) - Number(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare); // sort 정렬함수 JSON을 사용해 동일한 요소로 배열을 만들어 복사해 'copyList'로 저장한다.
    setSortedData(copyList); // sortData를 정렬된 일기로
  }, [data, sortType]);

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };
  const onClickNew = () => {
    navigate("/diary/new");
  };

  // searchBar
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = sortedData.filter((sortedDatas) => {
        return sortedDatas.content.replace(" ", "").toLowerCase().includes(searchInput.toLowerCase())
      })
      console.log(searchInput)
      setFilteredResults(filteredData) // 필터된 데이터 보이기
    } else {
      setFilteredResults(sortedData) // 전체 데이터 보이기
    }
    
  }
  const onChangeInput = (e) => {
    searchItems(e.target.value)
    setSearchInput(e.target.value)
  };

  const itemsPage = 3;
  const [visibleItems, setvisibleItems] = useState(itemsPage);

  const loadMoreItems = () => {
    setvisibleItems((prev) => prev + itemsPage);
  };

 
  return (
    <div className="DiaryList">
      <div className="input_wrap">
      </div>

      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
        <div className="search_wrapper">
          <input className="tool_bar" type="text" placeholder="search" onChange={onChangeInput} value={searchInput} />
        </div>
        <div className="right_col">
          <Button
            type={"positive"}

            onClick={onClickNew}
          />
          <FeatherIcon
            className="button_plus"
            icon="plus"
            size="24"
            strokeWidth="3"
            onClick={onClickNew} />
        </div>
      </div>
      <div className="list_wrapper">
        {searchInput.length > 0
          ? filteredResults.slice(0, visibleItems).map((it) => (
              <DiaryItem key={it.id} {...it} />
            ))
          : sortedData.slice(0, visibleItems).map((it) => (
              <DiaryItem key={it.id} {...it} />
            ))}
      </div>
      {visibleItems < (searchInput.length > 0 ? filteredResults.length : sortedData.length) && (
        <button className="loadMoreButton" onClick={loadMoreItems}>
          더보기
        </button>
      )}
    </div>
  );
};
export default DiaryList;