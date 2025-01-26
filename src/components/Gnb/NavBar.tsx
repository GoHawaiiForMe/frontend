import Link from "next/link";
import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import logo from "@public/assets/icon_logo_img.svg";
import menu from "@public/assets/icon_menu.svg";
import { useState, useEffect } from "react";
import closeIcon from "@public/assets/icon_X.svg";
import alarm_icon from "@public/assets/icon_alarm.svg";
import user_img from "@public/assets/icon_default.svg";
import chatting_icon from "@public/assets/icon_chatting.svg";
import coconut_icon from "@public/assets/icon_coconut.svg";
import Notification from "./Notification";
import UserMenu from "./UserMenu";
import userService from "@/services/userService";
import notificationService, { NotificationProps } from "@/services/notificationService";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

interface LinkItem {
  href: string;
  label: string;
  group?: string;
}

const linkItems: Record<"guest" | "DREAMER" | "MAKER", LinkItem[]> = {
  guest: [{ href: "/finding-maker", label: "Maker 찾기" }],
  DREAMER: [
    { href: "/plan-request", label: "여행 요청" },
    { href: "/finding-maker", label: "Maker 찾기" },
    { href: "/mytrip-manage/ongoing-plan", label: "내 여행 관리" },
  ],
  MAKER: [
    { href: "/receive", label: "받은 요청", group: "receive" },
    { href: "/managequo", label: "내 견적 관리" },
  ],
};

const getNotification = () => {
  const notificationData = notificationService.getNotification();
  return notificationData;
};

const NavBar = () => {
  const { isLoggedIn, nickName, role, coconut, setLogin } = useAuthStore();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userInfo, setUserInfo] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const router = useRouter();

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

  const handleCloseUserMenu = () => {
    setIsOpenUserMenu(false);
  };

  const renderLinks = () => {
    return (
      <>
        {linkItems[isLoggedIn ? role : "guest"].map((link, index) => {
          const isActive =
            link.group === "receive"
              ? ["/receive", "/all-receive-plan"].includes(router.pathname)
              : router.pathname === link.href;
          return (
            <li key={index}>
              <Link
                href={link.href}
                className={`${isActive ? "bold text-color-black-500" : "text-color-gray-500"}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </>
    );
  };

  const { data: notificationData = [] } = useQuery({
    queryKey: ["hasNotification"],
    queryFn: getNotification,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (isLoggedIn) {
      if (notificationData) {
        setNotifications(notificationData);
      }
    }
  }, [isLoggedIn, notificationData]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const fetchUserInfo = async () => {
        try {
          const userData = await userService.getUserInfo();
          setUserInfo(userData);
          setLogin(userData.nickName, userData.role, userData.coconut);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserInfo();
    }
  }, [setLogin]);

  const hasUnreadNotifications = notificationData.some((notification) => !notification.isRead);

  return (
    <div className="flex items-center justify-between border-b-2 border-color-line-100 bg-color-background-100 px-32 py-6 mobile:px-4 tablet:px-5 mobile-tablet:py-3">
      <div className="flex items-center">
        <div className="mr-16 text-2xl font-bold mobile-tablet:mr-0">
          <Link href="/">
            <Image src={logo} width={100} alt="임시로고" />
          </Link>
        </div>

        <ul className="bold hidden space-x-4 text-lg pc:flex">{renderLinks()}</ul>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <div className="flex cursor-pointer items-center space-x-2">
              <Image src={coconut_icon} alt="코코넛" width={24} height={24} />
              <p className="regular">{coconut}p</p>
            </div>
            <div className="relative">
              <Image
                src={chatting_icon}
                alt="채팅"
                width={36}
                height={36}
                className="cursor-pointer"
              />

              <span className="absolute right-0 top-0 h-2 w-2 animate-ping rounded-full bg-color-red-200"></span>
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-color-red-200"></span>
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
              {hasUnreadNotifications && (
                <>
                  <span className="absolute right-0 top-0 h-2 w-2 animate-ping rounded-full bg-color-red-200"></span>
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-color-red-200"></span>
                </>
              )}
            </div>

            {isOpenNotification && <Notification closeModal={handleCloseNotification} />}
            {notifications === null && null}

            <div
              className="flex cursor-pointer items-center space-x-2"
              onClick={handleOpenUserMenu}
            >
              <Image src={user_img} alt="유저이미지" width={36} height={36} />
              <span className="medium hidden text-2lg pc:block">
                {nickName} {role}
              </span>
            </div>
            {isOpenUserMenu && <UserMenu userId={userInfo?.id} closeMenu={handleCloseUserMenu} />}
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="semibold mobile-tablet:py-2) rounded-2xl bg-color-blue-300 px-10 py-3 text-2lg text-white hover:bg-color-blue-200 mobile-tablet:px-4 mobile-tablet:text-md">
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
          className="block cursor-pointer pc:hidden"
          onClick={handleOpenSidebar}
        />
      </div>

      {/* 사이드바 */}
      {isOpenSidebar && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-end bg-black bg-opacity-50">
          <div className="flex h-full w-[220px] flex-col bg-white p-4 shadow-lg">
            <div className="mb-4 flex justify-end">
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
            <ul className="bold mt-6 flex cursor-pointer flex-col gap-y-10 space-y-4 text-lg">
              {renderLinks()}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
