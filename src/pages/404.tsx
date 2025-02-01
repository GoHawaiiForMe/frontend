import Image from "next/image";
import tree from "@public/assets/404.png";
import tree_mobile from "@public/assets/404_mobile.png";
import sun from "@public/assets/icon_sun.png";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <>
      <div className="mobile-tablet:hidden">
        <Image src={tree} alt="야자수" fill priority={true} style={{ objectFit: "cover" }} />
      </div>
      <div className="pc:hidden">
        <Image src={tree_mobile} alt="야자수" fill priority={true} />
      </div>
      {/* pc버전 */}
      <div className="-mx-[260px] mobile-tablet:hidden">
        <div className="absolute inset-0 top-64 flex flex-col items-center text-color-gray-50">
          <h1 className="bold text-[100px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Not Found
          </h1>
          <div className="flex flex-row items-center">
            <h1 className="bold text-[200px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              4&nbsp;
            </h1>
            <div className="z-10 rounded-full shadow-2xl shadow-white">
              <Image src={sun} alt="해" width={180} height={180} />
            </div>
            <h1 className="bold text-[200px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              &nbsp;4
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="bold text-center text-2xl text-color-gray-400">
              페이지의 주소가 잘못 입력되었거나,
              <br /> 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => router.back()}
              className="bold mt-10 flex items-end rounded-xl bg-color-blue-200 px-8 py-4 text-2xl"
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
      {/* 모바일버전 */}
      <div className="pc:hidden">
        <div className="absolute inset-0 top-24 flex flex-col items-center">
          <h1 className="bold text-[50px] text-color-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mobile:text-[40px]">
            Not Found
          </h1>
          <div className="flex flex-row items-center text-color-gray-50">
            <h1 className="bold text-[100px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mobile:text-[70px]">
              4&nbsp;
            </h1>
            <div className="z-10 rounded-full shadow-2xl shadow-white">
              <Image src={sun} alt="해" width={70} height={70} />
            </div>
            <h1 className="bold text-[100px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mobile:text-[70px]">
              &nbsp;4
            </h1>
          </div>
          <div className="flex h-[60vh] flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <p className="bold text-color-blue-500 text-center text-xl">
                페이지의 주소가 잘못 입력되었거나,
                <br /> 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
              </p>
            </div>
            <div className="flex">
              <button
                onClick={() => router.back()}
                className="bold mt-10 flex items-end rounded-xl bg-color-blue-200 px-8 py-4 text-xl text-color-gray-50"
              >
                뒤로가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
