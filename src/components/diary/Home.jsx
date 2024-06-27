import { useState, useContext, useEffect } from "react";
import DiaryHeader from "./DiaryHeader";
import { getMonthRangeByDate } from "../../util";
import '../../asset/scss/common.css';
import FeatherIcon from 'feather-icons-react';
import { DiaryStateContext } from '../../context/DiaryContext';
import DiaryList from './DiaryList';


const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const DiaryHeaderTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1
    }월`;
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data.length >= 1) {
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, pivotDate]);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };


  return (
      <div className="contWrap mb40">
        <DiaryHeader
          title={DiaryHeaderTitle}
          leftChild={
            <FeatherIcon
              className="button_return"
              icon="chevron-left"
              size="24"
              fill="#fff"
              color="#9BA2A9"
              strokeWidth="2"
              onClick={onDecreaseMonth}
              type={"negative"} />}
          rightChild={
            <FeatherIcon
              className="button_return"
              icon="chevron-right"
              size="24"
              fill="#fff"
              color="#9BA2A9"
              strokeWidth="2"
              onClick={onIncreaseMonth}
              type={"negative"} />}
        />
        <DiaryList data={filteredData} />
      </div>
  );
};
export default Home;