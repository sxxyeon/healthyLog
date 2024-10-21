import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BtnBox from "./../auth/BtnBox";
import Editor from "./../board/Editor";
const BoardUpdate = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // URL에서 파라미터 받기

  const [initialNote, setInitialNote] = useState({});
  const [changeBoard, setChangeBoard] = useState(initialNote);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // initialNote가 설정되면 changeBoard 업데이트
    if (initialNote && Object.keys(initialNote).length > 0) {
      setChangeBoard(initialNote);
    }
  }, [initialNote]);

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_JSON}/board/${id}`);
      setInitialNote(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setChangeBoard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      changeBoard.title.trim() !== "" &&
      changeBoard.createBy.trim() !== "" &&
      changeBoard.contents.trim() !== ""
    ) {
      updateBoard(changeBoard);
    } else {
      alert("제목, 작성자, 내용은 필수 입력 항목입니다.");
    }
  };

  const updateBoard = async (changeBoard) => {
    const options = {
      title: changeBoard.title,
      createBy: changeBoard.createBy,
      contents: changeBoard.contents,
    };
    await axios.put(`${process.env.REACT_APP_JSON}/board/${id}`, options);

    alert("수정되었습니다.");
    navigate("/board/" + id);
  };

  const backToDetail = () => {
    navigate("/board/" + id);
  };

  return (
    <Editor
      title={changeBoard.title}
      contents={changeBoard.contents}
      createBy={changeBoard.createBy}
      onChange={onChange}
    >
      <BtnBox
        text1={"이전으로"}
        text2={"저장"}
        func1={backToDetail}
        func2={handleSave}
      />
    </Editor>
  );
};

export default BoardUpdate;
