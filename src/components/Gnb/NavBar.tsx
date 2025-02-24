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
import avatarImages from "@/utils/formatImage";
import { useRef } from "react";
import useRealTimeNotification from "@/stores/useRealTimeNotification";
import ChargeModal from "./ChargeModal";
import { getAccessToken } from "@/utils/tokenUtils";

interface LinkItem {
  href: string;
  label: string;
  group?: string;
}

enum NavigationPath {
  FINDING_MAKER = "/finding-maker",
  PLAN_REQUEST = "/plan-request",
  MY_TRIP_MANAGE = "/mytrip-manage/ongoing-plan",
  RECEIVE = "/receive",
  MANAGE_QUO = "/managequo",
  LOGIN = "/login",
  CHATTING = "/chatting",
  LANDING = "/",
}

const linkItems: Record<"guest" | "DREAMER" | "MAKER", LinkItem[]> = {
  guest: [{ href: NavigationPath.FINDING_MAKER, label: "Maker 찾기" }],
  DREAMER: [
    { href: NavigationPath.PLAN_REQUEST, label: "여행 요청" },
    { href: NavigationPath.FINDING_MAKER, label: "Maker 찾기" },
    { href: NavigationPath.MY_TRIP_MANAGE, label: "내 여행 관리", group: "mytrip-manage" },
  ],
  MAKER: [
    { href: NavigationPath.RECEIVE, label: "받은 요청", group: "receive" },
    { href: NavigationPath.MANAGE_QUO, label: "내 견적 관리", group: "managequo" },
  ],
};

const getNotification = () => {
  const notificationData = notificationService.getNotification();
  return notificationData;
};

const NavBar = () => {
  const { isLoggedIn, nickName, role, coconut, setCoconut, email, phoneNumber, setLogin } =
    useAuthStore();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [userImage, setUserImage] = useState<string>(user_img.src);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);

  const router = useRouter();
  const { realTimeNotifications } = useRealTimeNotification();

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

  const isLinkActive = (link: LinkItem): boolean => {
    switch (link.group) {
      case "receive":
        return [NavigationPath.RECEIVE, "/all-receive-plan"].includes(router.pathname);
      case "managequo":
        return [NavigationPath.MANAGE_QUO, "/reject-list"].includes(router.pathname);
      case "mytrip-manage":
        return router.pathname.startsWith("/mytrip-manage/");
      default:
        return router.pathname === link.href;
    }
  };

  const renderLinks = () => {
    const isCurrentUrlRelated = linkItems[isLoggedIn ? role : "guest"].some((link) =>
      isLinkActive(link),
    );

    return (
      <>
        {linkItems[isLoggedIn ? role : "guest"].map((link, index) => {
          const isActive = isLinkActive(link);

          return (
            <li key={index}>
              <Link
                href={link.href}
                onClick={() => setIsOpenSidebar(false)}
                className={`${
                  isCurrentUrlRelated
                    ? isActive
                      ? "bold text-color-black-500"
                      : "text-color-gray-500"
                    : "text-color-black-500"
                }`}
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
    if (isLoggedIn && notificationData) {
      setNotifications(notificationData);
    }
  }, [isLoggedIn, notificationData]);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const fetchUserInfo = async () => {
        try {
          const userData = await userService.getUserInfo();
          const profileData = await userService.getProfileInfo();

          setUserInfo(userData);
          const avatarImage = avatarImages.find((avatar) => avatar.key === profileData.image);
          setUserImage(avatarImage ? avatarImage.src : user_img.src);
          setLogin(nickName, role, coconut, email, phoneNumber);
          if (userData.coconut !== coconut) {
            handleCoconutChange(userData.coconut);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserInfo();
    }
  }, [setLogin, coconut]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpenUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpenUserMenu(false);
      }

      if (
        isOpenNotification &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpenNotification(false);
      }

      if (
        isOpenSidebar &&
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setIsOpenSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenUserMenu, isOpenNotification, isOpenSidebar]);

  const handleCoconutChange = (newCoconut: number) => {
    setCoconut(newCoconut);
  };

  const hasUnreadNotifications = notificationData.some((notification) => !notification.isRead);
  const hasNotifications = realTimeNotifications.length > 0;

  return (
    <div className="z-40 flex items-center justify-between border-b-2 border-color-line-100 bg-color-background-100 px-24 py-6 mobile:px-4 tablet:px-5 mobile-tablet:py-3">
      <div className="flex items-center">
        <div className="bold mr-14 text-2xl mobile-tablet:mr-0">
          <Link href={NavigationPath.LANDING}>
            <Image src={logo} width={100} alt="니가가라하와이 로고" />
          </Link>
        </div>

        <ul className="bold hidden space-x-4 text-lg pc:flex">{renderLinks()}</ul>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <div className="flex cursor-pointer items-center space-x-2">
              <Image src={coconut_icon} alt="코코넛" width={24} height={24} />
              <p className="regular">{coconut}개</p>
            </div>
            <div className="relative">
              <Link href={NavigationPath.CHATTING}>
                <Image
                  src={chatting_icon}
                  alt="채팅"
                  width={36}
                  height={36}
                  className="cursor-pointer"
                />
              </Link>
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

            {isOpenNotification && (
              <div ref={notificationRef} className="absolute z-50">
                <Notification closeModal={handleCloseNotification} />
              </div>
            )}
            {notifications === null && null}

            <div
              className="flex cursor-pointer items-center space-x-2"
              onClick={handleOpenUserMenu}
              ref={userMenuRef}
            >
              <Image
                src={userImage}
                alt="유저이미지"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="medium hidden text-2lg pc:block">
                {nickName} {role}
              </span>
            </div>
            {isOpenUserMenu && (
              <div ref={userMenuRef} className="absolute z-50">
                <UserMenu
                  userId={userInfo?.id}
                  closeMenu={handleCloseUserMenu}
                  onChargeClick={() => {
                    setIsChargeModalOpen(true);
                    handleCloseUserMenu();
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <Link href={NavigationPath.LOGIN}>
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
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-500 ${
          isOpenSidebar ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          ref={sideBarRef}
          className={`fixed right-0 top-0 h-full w-[220px] rounded-l-2xl bg-white p-4 shadow-lg transition-transform duration-500 ease-in-out ${
            isOpenSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
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
      {/* 실시간 알림 */}
      {hasNotifications && (
        <div className="fixed left-0 top-20 z-50 flex w-full flex-col gap-2 px-4 py-2">
          {realTimeNotifications.map((notification) => (
            <div
              key={notification.id}
              className="bold w-full rounded-xl bg-color-red-100 p-4 text-center text-color-black-500"
            >
              <p>🔔 {notification.content}</p>
            </div>
          ))}
        </div>
      )}

      {isChargeModalOpen && (
        <ChargeModal coconut={coconut} setIsChargeModalOpen={setIsChargeModalOpen} />
      )}
    </div>
  );
};

export default NavBar;
