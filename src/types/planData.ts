export type Service = {
    name: string;
    mapping: string;
};

export type Location = {
    name: string;
    mapping: string;
};

export type Data = {
    services: Service[];
    locations: Location[];
};

const planData: Data = {
    services: [
        { name: "맛집 탐방형", mapping: "FOOD_TOUR" },
        { name: "기념품/쇼핑형", mapping: "SHOPPING" },
        { name: "휴양형", mapping: "RELAXATION" },
        { name: "문화/역사탐방형", mapping: "CULTURE" },
        { name: "액티비티/탐험형", mapping: "ACTIVITY" },
        { name: "축제참여형", mapping: "FESTIVAL" },
    ],
    locations: [
        { name: "서울", mapping: "SEOUL" },
        { name: "부산", mapping: "BUSAN" },
        { name: "인천", mapping: "INCHEON" },
        { name: "대구", mapping: "DAEGU" },
        { name: "대전", mapping: "DAEJEON" },
        { name: "광주", mapping: "GWANGJU" },
        { name: "울산", mapping: "ULSAN" },
        { name: "세종", mapping: "SEJONG" },
        { name: "경기", mapping: "GYEONGGI" },
        { name: "강원", mapping: "GANGWON" },
        { name: "충북", mapping: "CHUNGBUK" },
        { name: "충남", mapping: "CHUNGNAM" },
        { name: "전북", mapping: "JEONBUK" },
        { name: "전남", mapping: "JEONNAM" },
        { name: "경북", mapping: "GYEONGBUK" },
        { name: "경남", mapping: "GYEONGNAM" },
        { name: "제주", mapping: "JEJU" },
    ],
};

export default planData;
