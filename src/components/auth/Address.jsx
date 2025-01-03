import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DaumPostcode from "react-daum-postcode";

const Address = (props) => {
  const [address, setAddress] = useState();

  const onCompletePost = (data) => {
    setAddress(data.address);
    document.getElementById("address").value = data.address;
    props.onClose();
  };

  return (
    <>
      <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
      <a
        className="closeBtn"
        onClick={() => {
          props.onClose();
        }}
        aria-label="주소창 닫기"
      >
        <Icon icon="iconoir:cancel" width="50" />
      </a>
    </>
  );
};

export default Address;
