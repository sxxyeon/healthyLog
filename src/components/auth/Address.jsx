import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import DaumPostcode from 'react-daum-postcode'


const Address = (props) => {
  const [address, setAddress] = useState();

    const onCompletePost = (data) =>{
      console.log(data.address);
      setAddress(data.address);
      document.getElementById('address').value = data.address;
      props.onClose()
    }

  return (
    <>
      <DaumPostcode
        onComplete={onCompletePost}
      ></DaumPostcode><a className="closeBtn" onClick={()=> {props.onClose()}}><Icon icon="iconoir:cancel" width="50"/></a>
    </>
  )
}

export default Address;