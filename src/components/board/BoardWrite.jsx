import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BtnBox from "./../auth/BtnBox";
import Editor from "./../board/Editor";
import axios from "axios";

const BoardWrite = () => {
  const [storedNotes, setStoredNotes] = useState([]);
  const initialNotes = storedNotes ? storedNotes : [];
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (storedNotes.length > 0) {
      const lastNoteId = storedNotes[storedNotes.length - 1].id;
      setIdNumber(lastNoteId + 1); // 마지막 노트의 ID 값에 1을 더한 값으로 idNumber 설정
    }
  }, [storedNotes]);

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_JSON}/board`);
      setStoredNotes(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //각 input값
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [createBy, setCreateBy] = useState("");
  const [idNumber, setIdNumber] = useState(1);

  const navigate = useNavigate();

  //input에 들어온 값 이벤트 핸들러
  const onChange = (event) => {
    const { value, name } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "contents") {
      setContents(value);
    } else if (name === "createBy") {
      setCreateBy(value);
    }
  };

  //저장 이벤트핸들러
  const saveHandler = async () => {
    const newNote = {
      id: idNumber,
      contents: contents,
      title: title,
      createBy: createBy,
    };

    const options = {
      title: newNote.title,
      createBy: newNote.createBy,
      contents: newNote.contents,
    };
    console.log(options);

    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_JSON}/board`,
        options
      );
      console.log("서버 응답:", resp.data);

      setNotes((prevNotes) => [...prevNotes, newNote]);
      setStoredNotes((prevNotes) => [...prevNotes, newNote]);

      setTitle("");
      setContents("");
      setCreateBy("");
      setIdNumber((prevIdNumber) => prevIdNumber + 1);

      alert("저장되었습니다.");
      navigate("/board");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("데이터 저장 중 오류가 발생했습니다.");
    }
  };

  const backButton = () => {
    navigate("/board");
  };

  useEffect(() => {
    if (initialNotes.length > 0) {
      const lastNoteId = initialNotes[initialNotes.length - 1].id;
      setIdNumber(lastNoteId + 1); // 마지막 노트의 ID 값에 1을 더한 값으로 idNumber 설정
    }
  }, [initialNotes]);

  // 입력값이 비어있지 않은 경우에만 저장 함수 호출
  const handleSave = () => {
    if (
      title.trim() !== "" &&
      createBy.trim() !== "" &&
      contents.trim() !== ""
    ) {
      saveHandler();
    } else {
      alert("제목, 작성자, 내용은 필수 입력 항목입니다.");
    }
  };

  return (
    <>
      <Editor
        title={title}
        contents={contents}
        createBy={createBy}
        onChange={onChange}
      >
        <BtnBox
          text1={"목록으로"}
          text2={"저장"}
          func1={backButton}
          func2={handleSave}
        />
      </Editor>
    </>
  );
};

export default BoardWrite;
