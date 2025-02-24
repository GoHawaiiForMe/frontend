import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeAccessToken } from "@/utils/tokenUtils";

export interface UserMenuProps {
  userId: string;
  closeMenu: () => void;
  onChargeClick: () => void;
}

interface MenuItem {
  href: string;
  label: string;
  onClick?: () => void;
}

enum NavigationPath {
  DREAMER_PROFILE = "/profile/dreamer/edit/",
  FOLLOW_MAKER = "/follow-maker",
  COMPLETED_TRIP_REVIEWS = "/myreview-manage/completed-trip",
  MAKER_PROFILE = "/profile/maker/mypage/",
}

export default function UserMenu({ userId, closeMenu, onChargeClick }: UserMenuProps) {
  const { nickName, role, setLogout } = useAuthStore();
  const router = useRouter();

  if (role === "guest") return null;

  const menuItems: Record<string, MenuItem[]> = {
    DREAMER: [
      { href: userId ? `${NavigationPath.DREAMER_PROFILE}${userId}` : "", label: "프로필 수정" },
      { href: NavigationPath.FOLLOW_MAKER, label: "찜한 Maker" },
      { href: NavigationPath.COMPLETED_TRIP_REVIEWS, label: "여행 리뷰" },
      {
        href: "",
        label: "코코넛 충전",
        onClick: onChargeClick,
      },
    ],
    MAKER: [
      { href: userId ? `${NavigationPath.MAKER_PROFILE}${userId}` : "", label: "마이페이지" },
    ],
  };

  const renderMenus = () => {
    return (
      <>
        {menuItems[role ? role : "DREAMER"].map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <button onClick={link.onClick} className="w-full text-left">
                {link.label}
              </button>
            ) : (
              <Link href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </>
    );
  };

  const handleLogout = () => {
    removeAccessToken();
    router.reload();
    setLogout();
    router.push("/login");
  };

  return (
    <>
      <div className="fixed right-20 top-20 z-[9999] flex tablet:right-16">
        <div className="flex w-[248px] flex-col gap-6 rounded-2xl border bg-color-gray-50 px-2 pt-6 shadow-lg mobile-tablet:w-[152px]">
          <div className="flex items-center justify-between px-6 mobile-tablet:pl-2">
            <span className="bold text-2lg mobile-tablet:text-lg">
              {nickName}
              {role}
            </span>
          </div>
          <div>
            <ul className="medium flex flex-col gap-6 px-6 text-lg mobile-tablet:pl-2 mobile-tablet:text-md">
              {renderMenus()}
            </ul>
          </div>
          <div className="h-[1px] w-full bg-color-line-100"></div>
          <div
            className="flex cursor-pointer justify-center pb-4 text-color-gray-500 mobile-tablet:text-xs"
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </div>
      </div>
    </>
  );
}
