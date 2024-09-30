import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import BtnBox from "./BtnBox";
import FormWrap from "./FormWrap";
import PopupDom from "./../popupDom";

const Join2 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const [id, setId] = useState("");
  const [idMsg, setIdMsg] = useState("");
  const [isId, setIsId] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  const [checkPw, setCheckPw] = useState("");

  const [name, setName] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [isName, setIsName] = useState(false);

  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [isphone, setIsPhone] = useState(false);

  const isAllValid = isId && isPassword && isName && isEmail;

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMsg("4-12 사이 대소문자 또는 숫자만 입력해 주세요");
      setIsId(false);
    } else {
      setIdMsg("");
      setIsId(true);
    }
  };
  const onsubmitId = (e) => {
    e.preventDefault();
    alert("사용하실 수 있는 ID 입니다");
  };
  //password
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!pwRegExp.test(currentPassword)) {
      setPasswordMsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요");
      setIsPassword(false);
    } else {
      setPasswordMsg("");
      setIsPassword(true);
    }
  };
  const onChangeCheckPw = (e) => {
    const currentCheckPw = e.target.value;
    setCheckPw(currentCheckPw);
  };
  const isSame = password === checkPw;
  //name
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length >= 7) {
      setNameMsg("이름은 7자리 이하로 작성해주세요");
      setIsName(false);
    } else {
      setNameMsg("");
      setIsName(true);
    }
  };
  //email
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailRegExp.test(currentEmail)) {
      setEmailMsg("이메일 형식에 맞게 입력해주세요");
      setIsEmail(false);
    } else {
      setEmailMsg("");
      setIsEmail(true);
    }
  };

  const nav = useNavigate();
  const onClickBtn = () => {
    nav(-1);
  };

  return (
    <>
      <div className="joinWrap">
        <div className="essentialWrap">
          <div className="tit">
            <h5 className="md-txt">
              정보입력 <span className="primary">(필수)</span>
            </h5>
          </div>
          <FormWrap
            id={"id"}
            value={id}
            onChange={onChangeId}
            placeholder="아이디"
            msg={idMsg}
            classN={`w-btn mt30`}
            onClick={onsubmitId}
            btnText={"중복확인"}
          />
          <FormWrap
            id={"password"}
            value={password}
            onChange={onChangePassword}
            placeholder="패스워드"
            type={"password"}
            msg={passwordMsg}
          />
          <FormWrap
            id={"checkPw"}
            value={checkPw}
            onChange={onChangeCheckPw}
            placeholder="패스워드 확인"
            type={"password"}
          >
            {checkPw !== "" && !isSame && (
              <p className="msg">비밀번호가 다릅니다.</p>
            )}
          </FormWrap>
          <FormWrap
            id={"name"}
            value={name}
            onChange={onChangeName}
            placeholder="이름"
            type={"text"}
            msg={nameMsg}
          />
          <FormWrap
            id={"email"}
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일"
            type={"text"}
            msg={emailMsg}
          />
        </div>

        <div className="essentialWrap">
          <div className="tit">
            <h5 className="md-txt">
              정보입력 <span className="primary">(선택)</span>
            </h5>
          </div>
          <div className="formWrap w-btn mt30">
            <form>
              <input id="address" name="address" type="text" readOnly />
              <input className="mt10" type="text" placeholder="상세주소 입력" />
              <button
                className="btn btn-primary"
                style={{
                  transform: "translateY(0)",
                  top: "10px",
                }}
                type="button"
                onClick={openPostCode}
              >
                주소검색
              </button>
            </form>
          </div>
        </div>
        <BtnBox
          text1={"이전"}
          text2={"다음"}
          nav1={-1}
          nav2={"/auth/join3"}
          disabled={isAllValid}
        />
      </div>

      {isPopupOpen && (
        <popupDom>
          <Address onClose={closePostCode} />
        </popupDom>
      )}
    </>
  );
};

export default Join2;
