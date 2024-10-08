import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoW from "../../asset/img/logo_txt_w.png";
import LogoP from "../../asset/img/logo_txt.png";
import { Icon } from "@iconify/react";
import useIsMain from "../../hooks/useIsMain";

const Header = () => {
  const authUrl = "/auth";
  const isMain = useIsMain();

  //드롭박스
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownVisible(!dropdownVisible);
  };

  // 스크롤 시 Header상태
  const [menuVisible, setMenuVisible] = useState(true);
  const [scrollY, setscrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < scrollY || currentScrollY < 100) {
        setMenuVisible(true);
      } else if (currentScrollY > scrollY && currentScrollY > 10) {
        // 스크롤을 내릴 때, 드롭다운 메뉴도 닫아줌
        setMenuVisible(false);
        setDropdownVisible(false);
      }

      setscrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  // Link 클릭 시 드롭다운 메뉴 닫기
  const handleLinkClick = () => {
    setDropdownVisible(false);
  };

  return (
    <div className={`header ${menuVisible ? "visible" : "hidden"}`}>
      <div className="upper">
        <div className="inner">
          <h1 className="logo">
            <Link to="/">
              {isMain ? (
                <img src={LogoW} alt="로고" />
              ) : (
                <img src={LogoP} alt="로고" />
              )}
            </Link>
          </h1>
          {window.location.href.includes(authUrl) ? (
            <ul className="unb">
              <li></li>
              <li>
                <a
                  className="dropdownBtn"
                  style={{ right: "30px" }}
                  onClick={toggleDropdown}
                >
                  <Icon
                    icon="mdi:menu"
                    color="#fd7b54"
                    width="30"
                    height="30"
                  />
                </a>
              </li>
            </ul>
          ) : (
            <ul className="unb">
              <li>
                <Link
                  to="/auth/login"
                  onClick={handleLinkClick}
                  className={`btn ${
                    isMain ? "btn-outline-w" : "btn-outline-p"
                  }`}
                >
                  로그인
                </Link>
              </li>
              <li>
                <a className="dropdownBtn" onClick={toggleDropdown}>
                  {isMain ? (
                    <Icon icon="mdi:menu" color="#fff" width="30" height="30" />
                  ) : (
                    <Icon
                      icon="mdi:menu"
                      color="#fd7b54"
                      width="30"
                      height="30"
                    />
                  )}
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* 드롭다운 메뉴 */}
      <div className={`dropdownMenu ${dropdownVisible ? "on" : ""}`}>
        <div className="menuWrap">
          <ul>
            <li>
              <ol>
                <li>
                  <a href="#">마이페이지</a>
                </li>
                <li>
                  <Link to="/diary/main" onClick={handleLinkClick}>
                    식단일기
                  </Link>
                </li>
              </ol>
            </li>
            <li>
              <ol>
                <li>
                  <a href="#">엔터테인먼트</a>
                </li>
                <li>
                  <Link to="/calculators" onClick={handleLinkClick}>
                    칼로리 계산기
                  </Link>
                </li>
                <li>
                  <Link to="/map" onClick={handleLinkClick}>
                    내 주변 건강맛집
                  </Link>
                </li>
              </ol>
            </li>
            <li>
              <ol>
                <li>
                  <a href="#">커뮤니티</a>
                </li>
                <li>
                  <Link
                    to="/board"
                    state={{ selectedMenu: "사용자 게시판" }}
                    onClick={handleLinkClick}
                  >
                    사용자 게시판
                  </Link>
                </li>
                <li>
                  <Link
                    to="/board"
                    state={{ selectedMenu: "다이어트 정보" }}
                    onClick={handleLinkClick}
                  >
                    다이어트 정보
                  </Link>
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
