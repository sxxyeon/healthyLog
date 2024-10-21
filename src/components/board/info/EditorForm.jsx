import React from "react";

const EditorForm = ({ tit, name, value, onChange, textarea }) => {
  const charLeft = 100 - value?.length;
  return textarea ? (
    <div>
      <h4 className="tit">{tit}</h4>
      <textarea
        name={name}
        cols="30"
        rows="10"
        value={value ?? ""}
        placeholder={tit}
        onChange={onChange}
        maxLength="100"
      ></textarea>
      <span className="label sm-txt">{charLeft} / 100</span>
    </div>
  ) : (
    <div>
      <h4 className="tit">{tit}</h4>
      <input
        type="text"
        name={name}
        placeholder={tit}
        value={value ?? ""}
        onChange={onChange}
      />
    </div>
  );
};

export default EditorForm;
