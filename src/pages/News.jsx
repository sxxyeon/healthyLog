import { useNavigate } from "react-router-dom";
import DiaryHeader from "../components/diary/DiaryHeader";
import Editor from "../components/diary/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../context/DiaryContext";

import "../asset/scss/common.css";
import FeatherIcon from "feather-icons-react";

const News = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    const { date, content, emotionId } = data;
    await onCreate(date, content, emotionId);
    navigate("/diary/main");
  };

  return (
    <>
      <DiaryHeader
        className="new_diary"
        title={"새 일기 쓰기"}
        leftChild={
          <FeatherIcon
            className="button_return"
            icon="chevron-left"
            size="24"
            color="#9BA2A9"
            strokeWidth="2"
            onClick={goBack}
            type={"negative"}
          />
        }
      />
      <Editor onSubmit={onSubmit} />
    </>
  );
};
export default News;
