"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const markers: { name: string; coordinates: [number, number]; data: any }[] = [
  {
    name: "서울",
    coordinates: [126.978, 37.5665],
    data: {
      total: 100,
      details: [
        { name: "맛집탐방", value: 40 },
        { name: "기념품", value: 60 },
      ],
    },
  },
  {
    name: "부산",
    coordinates: [129.0756, 35.1796],
    data: {
      total: 90,
      details: [
        { name: "맛집탐방", value: 50 },
        { name: "기념품", value: 40 },
      ],
    },
  },
  {
    name: "인천",
    coordinates: [126.7052, 37.4563],
    data: {
      total: 70,
      details: [
        { name: "맛집탐방", value: 30 },
        { name: "기념품", value: 40 },
      ],
    },
  },
  {
    name: "대구",
    coordinates: [128.6014, 35.8684],
    data: {
      total: 60,
      details: [
        { name: "맛집탐방", value: 35 },
        { name: "기념품", value: 25 },
      ],
    },
  },
  {
    name: "대전",
    coordinates: [127.3845, 36.3504],
    data: {
      total: 85,
      details: [
        { name: "맛집탐방", value: 45 },
        { name: "기념품", value: 40 },
      ],
    },
  },
  {
    name: "광주",
    coordinates: [126.8515, 35.1595],
    data: {
      total: 75,
      details: [
        { name: "맛집탐방", value: 30 },
        { name: "기념품", value: 45 },
      ],
    },
  },
  {
    name: "울산",
    coordinates: [129.3114, 35.5381],
    data: {
      total: 65,
      details: [
        { name: "맛집탐방", value: 25 },
        { name: "기념품", value: 40 },
      ],
    },
  },
  {
    name: "세종",
    coordinates: [127.289, 36.4804],
    data: {
      total: 50,
      details: [
        { name: "맛집탐방", value: 20 },
        { name: "기념품", value: 30 },
      ],
    },
  },
  {
    name: "경기",
    coordinates: [127.01, 37.275],
    data: {
      total: 80,
      details: [
        { name: "맛집탐방", value: 50 },
        { name: "기념품", value: 30 },
      ],
    },
  },
  {
    name: "강원",
    coordinates: [128.208, 37.766],
    data: {
      total: 65,
      details: [
        { name: "맛집탐방", value: 30 },
        { name: "기념품", value: 35 },
      ],
    },
  },
  {
    name: "충북",
    coordinates: [127.635, 36.6291],
    data: {
      total: 55,
      details: [
        { name: "맛집탐방", value: 25 },
        { name: "기념품", value: 30 },
      ],
    },
  },
  {
    name: "충남",
    coordinates: [126.775, 36.635],
    data: {
      total: 70,
      details: [
        { name: "맛집탐방", value: 35 },
        { name: "기념품", value: 35 },
      ],
    },
  },
  {
    name: "전북",
    coordinates: [127.108, 35.719],
    data: {
      total: 60,
      details: [
        { name: "맛집탐방", value: 20 },
        { name: "기념품", value: 40 },
      ],
    },
  },
  {
    name: "전남",
    coordinates: [126.732, 34.814],
    data: {
      total: 75,
      details: [
        { name: "맛집탐방", value: 40 },
        { name: "기념품", value: 35 },
      ],
    },
  },
  {
    name: "경북",
    coordinates: [128.669, 36.575],
    data: {
      total: 80,
      details: [
        { name: "맛집탐방", value: 45 },
        { name: "기념품", value: 35 },
      ],
    },
  },
  {
    name: "경남",
    coordinates: [128.673, 35.461],
    data: {
      total: 85,
      details: [
        { name: "맛집탐방", value: 50 },
        { name: "기념품", value: 35 },
      ],
    },
  },
  {
    name: "제주",
    coordinates: [126.501, 33.35],
    data: {
      total: 90,
      details: [
        { name: "맛집탐방", value: 60 },
        { name: "기념품", value: 30 },
      ],
    },
  },
];

const COLORS: { [key: string]: string } = {
  맛집탐방: "#FFD700",
  기념품: "#FF4500",
};

export default function MapMarker() {
  const [selectedRegion, setSelectedRegion] = useState<{ name: string; data: any } | null>(null);
  const [geoData, setGeoData] = useState(null);

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

  return (
    <div className="flex">
      {/* 지도 */}
      <div className="w-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [127, 36], scale: 6000 }}
          style={{ width: "100%", height: "800px" }}
        >
          {geoData && (
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} fill="#ACD2EB" stroke="#ddd" />
                ))
              }
            </Geographies>
          )}
          {/* 마커 추가 부분 수정해야함함 */}
          {markers.map(({ name, coordinates, data }) => (
            <Marker
              key={name}
              coordinates={coordinates}
              onClick={() => setSelectedRegion({ name, data })}
            >
              <circle r={5} fill="#255CE6" />
              <text textAnchor="middle" y={-10} fontSize={10} fill="#0F171F">
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* 통계 */}
      <div className="w-1/3 p-4">
        {selectedRegion ? (
          <>
            <h2 className="text-lg font-bold">{selectedRegion.name} 통계</h2>
            <p>총 서비스 수: {selectedRegion.data.total}</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={selectedRegion.data.details}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {selectedRegion.data.details.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#8884d8"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p>마커를 클릭하면 해당 행정지역 통계를 볼 수 있습니다.</p>
        )}
      </div>
    </div>
  );
}
