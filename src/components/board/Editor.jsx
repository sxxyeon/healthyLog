import React from "react";
import EditorForm from "./info/EditorForm";

const Editor = ({
  children,
  title,
  createBy,
  contents,
  onChange,
  charLeft,
}) => {
  return (
    <div className="editor">
      <EditorForm tit="제목" name="title" value={title} onChange={onChange} />
      <EditorForm
        tit="작성자"
        name="createBy"
        value={createBy}
        onChange={onChange}
      />
      <EditorForm
        tit="내용"
        name="contents"
        value={contents}
        onChange={onChange}
        textarea
        charLeft={charLeft}
      />
      <div>{children}</div>
    </div>
  );
};

export default Editor;
