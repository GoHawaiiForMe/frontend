export type ServiceArea =
  | "SEOUL"
  | "BUSAN"
  | "INCHEON"
  | "DAEGU"
  | "DAEJEON"
  | "GWANGJU"
  | "ULSAN"
  | "SEJONG"
  | "GYEONGGI"
  | "GANGWON"
  | "CHUNGBUK"
  | "CHUNGNAM"
  | "JEONBUK"
  | "JEONNAM"
  | "GYEONGBUK"
  | "GYEONGNAM"
  | "JEJU";

export const convertRegionToKorean = (region: ServiceArea): string => {
  const regionMap: Record<ServiceArea, string> = {
    SEOUL: "서울",
    BUSAN: "부산",
    INCHEON: "인천",
    DAEGU: "대구",
    DAEJEON: "대전",
    GWANGJU: "광주",
    ULSAN: "울산",
    SEJONG: "세종",
    GYEONGGI: "경기",
    GANGWON: "강원",
    CHUNGBUK: "충북",
    CHUNGNAM: "충남",
    JEONBUK: "전북",
    JEONNAM: "전남",
    GYEONGBUK: "경북",
    GYEONGNAM: "경남",
    JEJU: "제주",
  };

  return regionMap[region];
};
