import Link from "next/link";
import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import logo from "@public/assets/icon_logo_img.svg";
import menu from "@public/assets/icon_menu.svg";
import { useState } from "react";
import closeIcon from "@public/assets/icon_X.svg";
import alarm_icon from "@public/assets/icon_alarm.svg";
import user_img from "@public/assets/icon_default.svg";
import chatting_icon from "@public/assets/icon_chatting.svg";
import coconut_icon from "@public/assets/icon_coconut.svg";
import Notification from "./Notification";
import UserMenu from "./UserMenu";

const NavBar = () => {
  const { isLoggedIn, nickname, role, setLogout } = useAuthStore();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false);

  const handleOpenSidebar = () => {
    setIsOpenSidebar(true);
  };
  const handleOpenNotification = () => {
    setIsOpenNotification((prev) => !prev);
  };
  const handleCloseNotification = () => {
    setIsOpenNotification(false);
  };

  const handleOpenUserMenu = () => {
    setIsOpenUserMenu((prev) => !prev);
  };

  const renderLinks = () => {
    const linkItems = {
      guest: [{ href: "/", label: "Maker 찾기" }],
      Dreamer: [
        { href: "/", label: "여행 요청" },
        { href: "/", label: "Maker 찾기" },
        { href: "/", label: "내 여행 관리" },
      ],
      Maker: [
        { href: "/", label: "받은 요청" },
        { href: "/", label: "내 여행 관리" },
      ],
    };

    return (
      <>
        {linkItems[isLoggedIn ? role : "guest"].map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </>
    );
  };

  return (
    <div className="flex items-center justify-between py-6 bg-color-background-100 border-b-2 border-color-line-100 px-32 tablet:px-5 mobile:px-4 mobile-tablet:py-3">
      <div className="flex items-center">
        <div className="text-2xl font-bold mr-16 mobile-tablet:mr-0">
          <Link href="/">
            <Image src={logo} width={100} height={100} alt="임시로고" />
          </Link>
        </div>

        <ul className="space-x-4 text-lg bold hidden pc:flex">{renderLinks()}</ul>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Image src={coconut_icon} alt="코코넛" width={24} height={24} />
              <p className="regular">50p</p>
            </div>
            <div className="relative">
              <Image
                src={chatting_icon}
                alt="채팅"
                width={36}
                height={36}
                className="cursor-pointer"
              />
              <span className="absolute top-0 right-0 rounded-full h-2 w-2 bg-color-red-200 animate-ping"></span>
              <span className="absolute top-0 right-0 rounded-full h-2 w-2 bg-color-red-200"></span>
            </div>
            <div className="relative">
              <Image
                src={alarm_icon}
                alt="알림"
                width={36}
                height={36}
                onClick={handleOpenNotification}
                className="cursor-pointer"
              />
              {/* 알림 있다면 */}
              <span className="absolute top-0 right-0 rounded-full h-2 w-2 bg-color-red-200 animate-ping"></span>
              <span className="absolute top-0 right-0 rounded-full h-2 w-2 bg-color-red-200"></span>
            </div>

            {isOpenNotification && <Notification closeModal={handleCloseNotification} />}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleOpenUserMenu}
            >
              <Image src={user_img} alt="유저이미지" width={36} height={36} />
              <span className="text-2lg medium hidden pc:block">{nickname}</span>
            </div>
            {isOpenUserMenu && <UserMenu />}
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="px-10 py-3 bg-color-blue-300 rounded-2xl hover:bg-color-blue-200 text-white text-2lg semibold mobile-tablet:text-md mobile-tablet:px-4 mobile-tablet:py-2)">
                로그인
              </button>
            </Link>
          </>
        )}
        <Image
          src={menu}
          alt="메뉴"
          width={30}
          height={30}
          className="block pc:hidden cursor-pointer"
          onClick={handleOpenSidebar}
        />
      </div>

      {/* 사이드바 */}
      {isOpenSidebar && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-end items-center">
          <div className="flex flex-col bg-white w-[220px] h-full p-4 shadow-lg">
            <div className="flex justify-end mb-4">
              <Image
                src={closeIcon}
                alt="닫기"
                width={36}
                height={36}
                className="cursor-pointer"
                onClick={() => setIsOpenSidebar(false)}
              />
            </div>
            <div className="h-0.5 bg-color-line-100"></div>
            <ul className="flex flex-col space-y-4 mt-6 text-lg bold gap-y-10 cursor-pointer">
              {renderLinks()}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
