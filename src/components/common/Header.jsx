import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoW from "../../asset/img/logo_txt_w.png";
import LogoP from "../../asset/img/logo_txt.png";
import { Icon } from "@iconify/react";
import FeatherIcon from "feather-icons-react";
import useIsMain from "../../hooks/useIsMain";
import useIsMobile from "../../hooks/useIsMobile";

const Header = () => {
  const isMain = useIsMain();
  const isMobile = useIsMobile();
  // Web hover 메뉴 드롭다운
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  // 스크롤 시 Header상태
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrollY, setscrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < scrollY || currentScrollY < 100) {
        setHeaderVisible(true);
      } else if (currentScrollY > scrollY && currentScrollY > 10) {
        setHeaderVisible(false);
      }
      setscrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // pc ver 마우스 오버 이벤트
    const $header = document.querySelector(".header.web");
    const showDropdown = () => setDropdownVisible(true);
    const hideDropdown = () => setDropdownVisible(false);
    if ($header) {
      $header.addEventListener("mouseover", showDropdown);
      $header.addEventListener("mouseout", hideDropdown);
    }
    // mobile ver body fixed 이벤트
    if (mobileMenuVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [mobileMenuVisible]);

  return (
    <header
      className={`header ${headerVisible ? "visible" : "hidden"} ${
        dropdownVisible ? "over" : ""
      } ${isMobile ? "mobile" : "web"}`}
    >
      <div className="inner">
        <h1 className="logo">
          <Link to="/">
            {isMain && !dropdownVisible ? (
              <img src={LogoW} alt="로고" />
            ) : (
              <img src={LogoP} alt="로고" />
            )}
          </Link>
        </h1>

        {/* 드롭다운 메뉴 */}
        {isMobile ? (
          <div className="menu_wrap mobile">
            <div
              className={`gnb ${mobileMenuVisible ? "on" : ""} ${
                isMain && "gnb_main"
              }`}
            >
              <ul>
                <li>
                  마이페이지
                  <ol>
                    <li>
                      <Link
                        to="/diary/main"
                        onClick={() => setMobileMenuVisible(false)}
                      >
                        식단일기
                      </Link>
                    </li>
                  </ol>
                </li>
                <li>
                  엔터테인먼트
                  <ol>
                    <li>
                      <Link
                        to="/calculators"
                        onClick={() => setMobileMenuVisible(false)}
                      >
                        칼로리 계산기
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/map"
                        onClick={() => setMobileMenuVisible(false)}
                      >
                        내 주변 건강맛집
                      </Link>
                    </li>
                  </ol>
                </li>
                <li>
                  커뮤니티
                  <ol>
                    <li>
                      <Link
                        to="/board"
                        state={{ selectedMenu: "사용자 게시판" }}
                        onClick={() => setMobileMenuVisible(false)}
                      >
                        사용자 게시판
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/board"
                        state={{ selectedMenu: "다이어트 정보" }}
                        onClick={() => setMobileMenuVisible(false)}
                      >
                        다이어트 정보
                      </Link>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>

            <ul className="unb">
              <li>
                <Link
                  to="/result"
                  state={{ searchText: "" }}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  {isMain && !mobileMenuVisible ? (
                    <FeatherIcon icon="search" size="24" stroke="#fff" />
                  ) : (
                    <FeatherIcon icon="search" size="24" stroke="#fd7b54" />
                  )}
                </Link>
              </li>
              {!mobileMenuVisible && (
                <li>
                  <Link
                    to="/auth/login"
                    className={`btn ${
                      isMain ? "btn-outline-w" : "btn-outline-p"
                    }`}
                  >
                    로그인
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                  className="dropdown_btn"
                >
                  {mobileMenuVisible ? (
                    <Icon
                      icon="mdi:close"
                      color="#fd7b54"
                      width="24"
                      height="24"
                    />
                  ) : isMain ? (
                    <Icon icon="mdi:menu" color="#fff" width="24" height="24" />
                  ) : (
                    <Icon
                      icon="mdi:menu"
                      color="#fd7b54"
                      width="24"
                      height="24"
                    />
                  )}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="menu_wrap web">
            <div className={`gnb ${isMain && "gnb_main"}`}>
              <ul>
                <li>
                  <a href="#">마이페이지</a>
                  <ol>
                    <li>
                      <Link
                        to="/diary/main"
                        onClick={() => setDropdownVisible(false)}
                      >
                        식단일기
                      </Link>
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#">엔터테인먼트</a>
                  <ol>
                    <li>
                      <Link
                        to="/calculators"
                        onClick={() => setDropdownVisible(false)}
                      >
                        칼로리 계산기
                      </Link>
                    </li>
                    <li>
                      <Link to="/map" onClick={() => setDropdownVisible(false)}>
                        내 주변 건강맛집
                      </Link>
                    </li>
                  </ol>
                </li>
                <li>
                  <a href="#">커뮤니티</a>
                  <ol>
                    <li>
                      <Link
                        to="/board"
                        state={{ selectedMenu: "사용자 게시판" }}
                        onClick={() => setDropdownVisible(false)}
                      >
                        사용자 게시판
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/board"
                        state={{ selectedMenu: "다이어트 정보" }}
                        onClick={() => setDropdownVisible(false)}
                      >
                        다이어트 정보
                      </Link>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>

            <ul className="unb">
              <li>
                <Link to="/result" state={{ searchText: "" }}>
                  {isMain && !dropdownVisible ? (
                    <FeatherIcon icon="search" size="30" stroke="#fff" />
                  ) : (
                    <FeatherIcon icon="search" size="30" stroke="#fd7b54" />
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className={`btn ${
                    isMain && !dropdownVisible
                      ? "btn-outline-w"
                      : "btn-outline-p"
                  }`}
                >
                  로그인
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
