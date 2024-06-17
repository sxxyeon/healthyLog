import React from 'react'
import { Icon } from '@iconify/react';

const mapModal = ({
    search,
    openMarkerId,
    setOpenMarkerId,
    isModalOpen,
    onModalOpen,
    moveLatLng,
    isSideBarOpen,
    isMobile
}) => {
    
  return (
    <>
    {!isMobile && (
        <div className="modalContainer" style={{display : isSideBarOpen ? 'block':'none'}}>
            <div className="modalCont">
                <ul>
                    {search.map((data) =>(
                        <li key={data.id} onClick={()=> {
                            setOpenMarkerId(data.id);
                            moveLatLng(data)
                        }}
                            selected={data.id === openMarkerId}
                        >
                            <p className="psName">{data.place_name}</p>
                            <p className="psCate">{data.category_name}</p>
                            <p className="psAddr">{data.address_name}</p>
                            <p className="psPhone">{data.phone}</p>
                           
                        </li>
                    ))}
                    
                </ul>
                {/* 검색결과가 없는경우 */}
                {search.length === 0 &&
                    <p>검색된 결과가 없습니다</p>               
                }
                
            </div>
        </div>
    )}

{isMobile && (
        <div className="modalContainer" style={{display : isModalOpen ? 'block':'none'}}>
            <div className="modalCont">
            <button className='closeBtn' onClick={onModalOpen} >
            <Icon icon="ion:close-circle" color="#555" width="30px" />
            </button>
                <ul>
                    {search.map((data) =>(
                        <li key={data.id} onClick={()=> {
                            setOpenMarkerId(data.id);
                            moveLatLng(data)
                        }}
                            selected={data.id === openMarkerId}
                        >
                            <p className="psName">{data.place_name}</p>
                            <p className="psCate">{data.category_name}</p>
                            <p className="psAddr">{data.address_name}</p>
                            <p className="psPhone">{data.phone}</p>
                           
                        </li>
                    ))}
                    
                </ul>
                {/* 검색결과가 없는경우 */}
                {search.length === 0 &&
                    <p>검색된 결과가 없습니다</p>               
                }
                
            </div>
        </div>
    )}
    </>
  )
}

export default mapModal