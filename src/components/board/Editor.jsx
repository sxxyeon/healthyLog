import React from "react";

const Editor = ({
  children,
  title,
  createBy,
  contents,
  charLeft,
  onChange,
}) => {
  return (
    <div>
      <div className="createBox">
        <div>
          <span className="createspan">제목</span>
          <input
            type="text"
            className="createTitleInput"
            name="title"
            placeholder="제목"
            value={title}
            onChange={onChange}
          />
        </div>
        <div>
          <span className="createspan">작성자</span>
          <input
            type="text"
            className="createByInput"
            name="createBy"
            placeholder="작성자"
            value={createBy}
            onChange={onChange}
          />
        </div>
        <div>
          <span className="createspan">내용</span>
          <textarea
            className="creatInputContents"
            name="contents"
            cols="30"
            rows="10"
            value={contents}
            placeholder="내용"
            onChange={onChange}
            maxLength="100"
          ></textarea>
          <span className="label sm-txt">{charLeft} / 100</span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Editor;
