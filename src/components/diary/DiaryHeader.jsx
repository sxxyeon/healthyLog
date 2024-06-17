
const DiaryHeader = ({ title, leftChild, rightChild }) => {
  return (
    <div className="DiaryHeader">
      <div className="diaryHeader_left">{leftChild}</div>
      <div className="diaryHeader_title">{title}</div>
      <div className="diaryHeader_right">{rightChild}</div>
    </div>
  );
};
export default DiaryHeader;
