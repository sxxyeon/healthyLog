import { Link } from "react-router-dom";
import { InfoData } from "../../../hooks/InfoData";

function InfoList() {
  return (
    <ul className="boardList">
      {InfoData.map((boardItem) => (
        <li key={boardItem.id} id={boardItem.id}>
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
  );
}

export default InfoList;
