// import "./Editor.scss";
import { useState, useEffect, useCallback } from "react";
import { emotionList, getFormattedDate } from "../../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 2,
        content: "",
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
        setInputCount( // 0/100자 text count 정규식 함수
            e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
        );
    };



    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);

    const handleSubmit = () => { // 작성완료 버튼클릭 이벤트핸들러
        onSubmit(state);
    };
    const handleOnGoBack = () => { // 취소 버튼클릭 이벤트핸들러
        navigate(-1);
    };

    // input event
    let [inputCount, setInputCount] = useState(0);

    return (
        <div className="Editor">
            {/* <div className="title_wrapper">
                <h4>식단일기</h4>
                <p>하루의 식단과 기분을 기록으로 남겨보세요</p>
            </div> */}
            <div className="date_wrapper mt30">
                <h5>날짜를 선택해주세요</h5>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate} />
                </div>
            </div>
            <div className="editor_section mt40">
                <h5 className="mb20">오늘 하루 나의 건강 지수는?</h5>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <div className="input_wrapper">
                    <textarea
                        placeholder="오늘은 어떤걸 먹었나요?"
                        value={state.content}
                        onChange={handleChangeContent}
                        // onChange={onInputHandler}
                        maxLength="700"
                    />

                    <p>
                        <span>{inputCount}</span> {/* //글자수 표시하는 부분 */}
                        <span>/700 자</span>
                    </p>
                </div>
            </div>
            <div className="btnBox">
                <Button text={"이전으로"} onClick={handleOnGoBack} />
                <Button text={"저장하기"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;