import React from 'react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import marker from '../../asset/img/marker.png'
import meMarker from '../../asset/img/meMarker.png'
import FeatherIcon from 'feather-icons-react'
import MapModal from './MapModal'
const { kakao } = window
const Map2 = () => {
  // 기본 위치 상태
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })
  // 카카오 맵에 접근해 지도 상태 조작하는 상태 변수
  const [map, setMap] = useState(null)
  // 검색에 사용될 키워드 고정
  const keyword = '건강식'
  // 검색 결과를 담는 상태 변수
  const [search, setSearch] = useState([])
  // 현재 페이지 번호를 관리하는 상태 변수
  const [currentPage, setCurrentPage] = useState(1)
  // 현재 열려있는 마커의 ID를 관리하는 상태 변수
  const [openMarkerId, setOpenMarkerId] = useState(null)
  // 사이드바의 열림/닫힘 상태를 관리하는 상태 변수
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // 모바일 환경에서 사용될 모달의 열림/닫힘 상태를 관리하는 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 미디어쿼리를 이용해 현재 화면이 모바일 크기인지 판단하는 변수
  const isMobile = useMediaQuery({ maxWidth: 768 })
  // 마지막으로 이동한 지도의 중심 좌표 저장 상태 변수
  const [lastCenter, setLastCenter] = useState(null)

  // 현재 사용자 위치 받아오기 (geolocation)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }))
    }
  }, [])

  // 검색된 장소 표시하기
  const displayPlaces = (data) => {
    const bounds = new kakao.maps.LatLngBounds()

    // 검색된 장소 위치와 현재위치 기준으로 지도 범위 재설정
    data.forEach((item) => bounds.extend(new kakao.maps.LatLng(item.y, item.x)))
    bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng))
    map.setBounds(bounds)
    setSearch(data)
  }

  // 키워드로 주변 위치 검색
  const searchPlaces = (center) => {
    // Places 서비스 객체 생성
    const ps = new kakao.maps.services.Places()
    // 검색 옵션 설정
    const options = {
      // 함수 호출 시에 전달받은 중심 좌표를 사용해 검색을 수행하게 변경
      location: new kakao.maps.LatLng(center.lat, center.lng),
      radius: 5000,
      sort: kakao.maps.services.SortBy.DISTANCE,
    }

    // Places 서비스의 keywordSearch 메소드 호출
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          //console.log(data);
          displayPlaces(data)

          // 검색 결과만을 기준으로 지도 영역을 조정
          const bounds = new kakao.maps.LatLngBounds()
          data.forEach((item) =>
            bounds.extend(new kakao.maps.LatLng(item.y, item.x))
          )

          // 조정된 지도 영역을 설정하며 줌 레벨을 변경하지 않음
          map.setBounds(bounds)
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setSearch(data)
        } else if (status === kakao.maps.services.Status.ERROR) {
          console.error('검색에 실패하였습니다.')
        }
      },
      options
    )
  }

  // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (data) => {
    const newLatLng = new kakao.maps.LatLng(data.y, data.x)
    map.panTo(newLatLng)
  }

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map) return
    setOpenMarkerId(null)
    searchPlaces(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, keyword, currentPage])

  // 마커 클릭 시 CustomOverlayMap를 열고 닫는 함수
  useEffect(() => {
    if (!map) return
    const clickListener = () => {
      setOpenMarkerId(null)
    }
    kakao.maps.event.addListener(map, 'click', clickListener)

    return () => {
      kakao.maps.event.removeListener(map, 'click', clickListener)
    }
  }, [map])

  // 현재 위치로 돌아가기
  const goBack = () => {
    const newLatLng = new kakao.maps.LatLng(state.center.lat, state.center.lng)
    map.panTo(newLatLng)
  }

  // 현 지도에서 재검색하기
  const handleReSearch = () => {
    if (!map) return

    // 현재 지도의 중심 좌표를 검색할 위치로 설정
    const centerLatLng = map.getCenter()
    const newCenter = {
      lat: centerLatLng.getLat(),
      lng: centerLatLng.getLng(),
    }

    // 검색할 페이지를 1페이지로 초기화
    setCurrentPage(1)

    // 검색 실행
    searchPlaces(newCenter, 1)

    //lastCenter 업데이트
    setLastCenter(newCenter)
  }
   // 사이드바 보이기 기능
   const onSideBarOpen = (e) =>{
    setIsSidebarOpen((prev) => !prev)

  }
  const onModalOpen = (e) =>{
    e.preventDefault();
    setIsModalOpen((prev) => !prev)
  }
  return (
    <div className='mapWrap'>
      <div className='MapContainer' style={{ maxWidth : !isMobile ? '800px' : '600px'}}>
      
        {/* 지도 컴포넌트 */}
        <Map
          center={state.center}
          level={3}
          onCreate={setMap} // 지도가 생성될 때 setMap 함수를 호출해 지도 객체 업데이트 추가
        >
          {/* 현재 위치 마커 표시 */}
          <MapMarker
            position={state.center}
            image={{
              src: meMarker,
              size: {
                width: 50,
                height: 50,
              },
            }}
          />
          {/* 현재 내 위치로 돌아가는 버튼 */}
          <button 
            className='GoBackButton'
            onClick={goBack}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          ><FeatherIcon icon="crosshair" width="30" height="30" stroke='#fd7b54' fill="#fff"/>
          </button> 
          {/* 현 지도에서 키워드 재검색 버튼 */}
          <button className="ReSearchButton" onClick={handleReSearch}>
            현 지도에서 검색
          </button>
          {/* 검색된 장소 마커 표시 */}
          {search.map((data) => (
            
            <React.Fragment key={data.id}>
              <MapMarker
                key={data.id}
                position={{ lat: data.y, lng: data.x }}
                image={{
                  src: marker,
                  size: {
                    width: 35,
                    height: 35,
                  },
                }}
                onClick={() => {
                  if (data.id === openMarkerId) {
                    setOpenMarkerId(null);
                  } else {
                    setOpenMarkerId(data.id);
                    moveLatLng(data);
                  }
                }}
              />
              {/* 해당 마커에 커스텀 오버레이 표시 */}
              {openMarkerId === data.id && (
                <CustomOverlayMap yAnchor={2.1} position={{ lat: data.y, lng: data.x }} clickable>
                  <div className='DetailInfo'>
                    <div className='arrow' />
                    <p className='placeName'>{data.place_name}</p>
                    {/* 상세 정보로 연결되는 링크 */}
                    <a className="DetailLink" href={data.place_url} target='_blank'>
                      <FeatherIcon icon="chevron-right" width="30" height="30" stroke="#fd7b54"/>
                    </a>
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
        </Map>
        {/* PC 화면일 경우, 검색 결과 목록 사이드바로 표시 */}
        {!isMobile && (
          <>
          <div className="modalWrap w">
            <MapModal
              isMobile={isMobile}
              search={search}
              openMarkerId={openMarkerId}
              setOpenMarkerId={setOpenMarkerId}
              moveLatLng={moveLatLng}
              isSideBarOpen={isSidebarOpen}
            />
          </div>
          {/* 사이드바 오픈 버튼 */}
          <button className="SideBarOpenBtn" id='SideBarOpenBtn' onClick={onSideBarOpen} style={{left: isSidebarOpen? 202+'px' : 0}}>
            {isSidebarOpen ? <FeatherIcon icon="chevron-left" size="25" color="#fff"/> : <FeatherIcon icon="chevron-right" size="25" color="#fff"/>  }  
          </button>
        </>
        )}
        {/* 모바일 화면일 경우 검색 결과 모달로 표시 */}
        {isMobile && (
          <div className="modalWrap m">
            <MapModal
              isMobile={isMobile}
              search={search}
              openMarkerId={openMarkerId}
              setOpenMarkerId={setOpenMarkerId}
              isModalOpen={isModalOpen}
              onModalOpen={onModalOpen}
              moveLatLng={moveLatLng}
            />
            <button className="modalOpenBtn" onClick={onModalOpen}>리스트로 보기</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Map2
