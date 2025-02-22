"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import planService from "@/services/planService";
import planData from "@/types/planData";
import Image from "next/image";
import refresh_icon from "@public/assets/icon_refresh.svg";

const regionNames = planData.locations.reduce(
  (acc, { name, mapping }) => {
    acc[mapping] = name;
    return acc;
  },
  {} as Record<string, string>,
);

const serviceNames = planData.services.reduce(
  (acc, { name, mapping }) => {
    acc[mapping] = name;
    return acc;
  },
  {} as Record<string, string>,
);

const markers = [
  { name: "서울", code: "SEOUL", coordinates: [126.978, 37.5665] },
  { name: "부산", code: "BUSAN", coordinates: [129.0756, 35.1796] },
  { name: "인천", code: "INCHEON", coordinates: [126.7052, 37.4563] },
  { name: "대구", code: "DAEGU", coordinates: [128.6014, 35.8684] },
  { name: "대전", code: "DAEJEON", coordinates: [127.3845, 36.3504] },
  { name: "광주", code: "GWANGJU", coordinates: [126.8515, 35.1595] },
  { name: "울산", code: "ULSAN", coordinates: [129.3114, 35.5381] },
  { name: "세종", code: "SEJONG", coordinates: [127.289, 36.4804] },
  { name: "경기", code: "GYEONGGI", coordinates: [127.01, 37.275] },
  { name: "강원", code: "GANGWON", coordinates: [128.208, 37.766] },
  { name: "충북", code: "CHUNGBUK", coordinates: [127.635, 36.6291] },
  { name: "충남", code: "CHUNGNAM", coordinates: [126.775, 36.635] },
  { name: "전북", code: "JEONBUK", coordinates: [127.108, 35.719] },
  { name: "전남", code: "JEONNAM", coordinates: [126.732, 34.814] },
  { name: "경북", code: "GYEONGBUK", coordinates: [128.669, 36.575] },
  { name: "경남", code: "GYEONGNAM", coordinates: [128.673, 35.461] },
  { name: "제주", code: "JEJU", coordinates: [126.501, 33.35] },
];

const COLORS = ["#845ec2", "#d65db1", "#ff6f91", "#ff9671", "#FCC737", "#A7D477", "#00c9a7"];

export default function MapMarker() {
  const [selectedRegion, setSelectedRegion] = useState<{
    name: string;
    totalCount: number;
    details: { name: string; value: number; fill: string }[];
  } | null>(null);

  const [geoData, setGeoData] = useState(null);

  const getStatistics = async (serviceArea: string) => {
    try {
      const data = await planService.getStatistics(serviceArea);
      if (data) {
        const details = data.groupByCount.map((item: any, index: number) => {
          const regionName = regionNames[item.serviceArea];

          const serviceName = serviceNames[item.tripType];

          return {
            name: regionName || serviceName,
            value: item.count,
            fill: COLORS[index % COLORS.length],
          };
        });
        setSelectedRegion({
          name: serviceArea || "전체",
          totalCount: data.totalCount,
          details: details,
        });
      }
    } catch (error) {
      console.error("통계 자료 조회 실패", error);
    }
  };

  useEffect(() => {
    const loadGeoData = async () => {
      try {
        const response = await fetch("/korea-topo.json");
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error("TopoJSON 로드 오류:", error);
      }
    };

    loadGeoData();
  }, []);

  useEffect(() => {
    getStatistics("");
  }, []);

  const handleMarkerClick = (region: string) => {
    const englishRegion = Object.keys(regionNames).find((key) => regionNames[key] === region);

    if (englishRegion) {
      getStatistics(englishRegion);
    }
  };

  return (
    <>
      <div className="bold mb-7 mt-7 flex justify-center">
        <h1 className="mb-10 mt-24 animate-bounce text-4xl mobile-tablet:text-2xl">
          🛬 사용자 이용현황 🛬
        </h1>
      </div>
      <div className="flex items-center rounded-xl bg-color-blue-400 bg-opacity-15 pc:-ml-10 pc:-mr-16 mobile-tablet:ml-0 mobile-tablet:flex-col">
        {/* 지도 */}
        <div className="sw-full mobile-tablet:order-2">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [127, 36], scale: 6000 }}
            className="h-[800px] w-[700px] mobile:h-[500px] mobile:w-[500px] tablet:h-[600px] tablet:w-[600px]"
          >
            {geoData && (
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} fill="#FFF2F2" />
                  ))
                }
              </Geographies>
            )}
            {markers.map(({ name, coordinates }) => (
              <Marker
                key={name}
                coordinates={coordinates as [number, number]}
                onClick={() => handleMarkerClick(name)}
              >
                <text
                  textAnchor="middle"
                  x={10}
                  y={0}
                  fontSize={12}
                  fill="#0F171F"
                  fontWeight="bold"
                  className="cursor-pointer"
                >
                  {name}
                </text>
                <path
                  d="M0,0 C6,-12 6,-18 0,-20 C-6,-18 -6,-12 0,0 Z"
                  fill="#FF8383"
                  transform="translate(-8, 10) scale(1.7)"
                  className="cursor-pointer"
                />
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* 통계 */}
        <div className="flex h-[400px] w-1/3 flex-col items-center rounded-xl bg-color-gray-50 p-4 shadow-2xl hover:scale-[1.05] pc:-ml-5 mobile-tablet:order-1 mobile-tablet:mt-10 mobile-tablet:w-[400px]">
          {selectedRegion ? (
            <>
              <div className="flex w-full justify-between gap-10">
                <h2 className="bold flex-grow justify-center pl-14 text-center text-lg">
                  {regionNames[selectedRegion.name]} 통계
                </h2>
                <div className="mb-4 flex items-center justify-end">
                  <button onClick={() => getStatistics("")} className="flex items-center gap-2">
                    <Image src={refresh_icon} alt="되돌리기" width={20} height={20} />
                  </button>
                </div>
              </div>

              <p>총 서비스 수: {selectedRegion.totalCount}</p>
              {selectedRegion.totalCount === 0 ? (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="bold text-center text-lg">
                    통계 자료가 없습니다!
                    <br />
                    여러분의 꿈을 추가해 보세요! 🚀
                  </p>
                </div>
              ) : (
                <PieChart width={300} height={300}>
                  <Pie
                    data={selectedRegion.details}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {selectedRegion.details.map((entry, index) => (
                      <Cell key={`cell${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}

              <p className="text-sm">마커를 클릭하면 해당 지역 통계를 볼 수 있습니다.</p>
            </>
          ) : (
            <p>마커를 클릭하면 해당 지역 통계를 볼 수 있습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}
