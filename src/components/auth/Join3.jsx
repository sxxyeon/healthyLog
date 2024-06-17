import React from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Join3 = () => {
  return (
    <>
        <div className="subTitle tc">
        <Icon icon="fluent:bowl-salad-24-filled" color="#fd7b54" width="60" />
            <h4>회원가입이<br/>완료되었습니다</h4>
            <p>다양한 서비스를 이용해보세요</p>
        </div>
        <div className="btnBox tc mt40">
            <Link to ="/">
                <button className="btn btn01">메인으로</button>
            </Link>
        </div>
    </>
  )
}

export default Join3