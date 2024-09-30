import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BtnNavi from "./info/BtnNavi";
import axios from "axios";
import { useEffect } from "react";

const BoardDetail = () => {
  const nav = useNavigate();
  const { id } = useParams(); // URL에서 파라미터 받기
  const [notes, setNotes] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      const foundBoard = notes.find((note) => note.id === parseInt(id, 10));
      setSelectedBoard(foundBoard);
    }
  }, [notes, id]);

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_JSON}/board`);
      setNotes(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const moveToUpdate = () => {
    nav("/update/" + id);
  };

  const moveToprev = () => {
    nav("/board/" + (parseInt(id) - 1), {
      state: { selectedMenu: "사용자게시판" },
    });
  };

  const moveToNext = () => {
    nav("/board/" + (parseInt(id) + 1), {
      state: { selectedMenu: "사용자게시판" },
    });
  };

  const moveToList = () => {
    nav("/board", { state: { selectedMenu: "사용자게시판" } });
  };

  const deleteNote = async (id) => {
    await axios.delete(`${process.env.REACT_APP_JSON}/board/${id}`);
    moveToList(); // 목록으로 이동
  };

  return (
    <div>
      {/* 선택된 항목이 있을 때만 BoardDetailson 컴포넌트를 렌더링 */}
      {selectedBoard && (
        <div className="detailBox">
          <div className="detailTitle">
            <h2>{selectedBoard.title}</h2>
          </div>

          <div className="detailCreate">
            <h3>{selectedBoard.createBy}</h3>
          </div>
          <div className="detailcontents">{selectedBoard.contents}</div>
          <BtnNavi
            id={selectedBoard.id}
            data={notes}
            moveToprev={moveToprev}
            moveToNext={moveToNext}
            moveToUpdate={moveToUpdate}
            deleteNote={deleteNote}
            moveToList={moveToList}
          />
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
