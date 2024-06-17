import { Link } from "react-router-dom";
import { InfoData } from "../../../hooks/InfoData";

function InfoList() {
  return (
    <div className="boardcontainer">
      <div className="boardContents">
        {/* <p>다이어트 정보</p> */}
        <ul className="listBox1">
          {InfoData.map((boardItem) => (
            <li className="boardContents" key={boardItem.id} id={boardItem.id}>
              <Link
                to={`/board/info/${boardItem.id}`}
                state={{ board: boardItem }}
                className="boardLink"
              >
                {boardItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InfoList;
