import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";

export interface UserMenuProps {
  userId: string;
  closeMenu: () => void;
}

export default function UserMenu({ userId, closeMenu }: UserMenuProps) {
  const { nickName, role, setLogout } = useAuthStore();

  if (role === "guest") return null;

  const renderMenus = () => {
    const menuItems = {
      DREAMER: [
        { href: userId ? `/profile/dreamer/edit/${userId}` : "", label: "프로필 수정" },
        { href: "/follow-maker", label: "찜한 Maker" },
        { href: "/trip-review", label: "여행 리뷰" },
      ],
      MAKER: [{ href: userId ? `/profile/maker/mypage` : "", label: "마이페이지" }],
    };

    return (
      <>
        {menuItems[role ? role : "DREAMER"].map((link, index) => (
          <li key={index}>
            <Link href={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          </li>
        ))}
      </>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    setLogout();
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
