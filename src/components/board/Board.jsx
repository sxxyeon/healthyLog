import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect } from "react";
function Board() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_JSON}/board`);
    setBoard(resp.data);
  };
  const [board, setBoard] = useState([]);
  console.log(board);
  //글쓰기 이벤트 핸들러
  const moveToWrite = () => {
    navigate("/write");
  };

  return (
    <ul className="boardList">
      {board?.map((boardItem) => (
        <li key={boardItem.id} id={boardItem.id}>
          <Link
            to={`/board/${boardItem.id}`}
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

export default Board;
