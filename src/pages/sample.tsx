import { useQuery, useQueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

const sampleData = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
    createdAt: "2021-10-01",
  },
  {
    userId: 2,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
    createdAt: "2021-10-02",
  },
];

type SampleDataAPI = typeof sampleData;
type SampleDataAPIItem = (typeof sampleData)[number];
type SampleData = Omit<SampleDataAPIItem, "createdAt">;

// mapper 함수
const mapSampleDataItem = (data: SampleDataAPIItem): SampleData => {
  return {
    userId: data.userId,
    id: data.id,
    title: data.title,
    completed: data.completed,
  };
};

const asyncFetchSampleData = async (): Promise<SampleDataAPI> => {
  // server api call mimic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData);
    }, 1000);
  });
};

const addItemToSample = () => {
  const dummyItem = {
    userId: 1,
    id: sampleData.length + 1,
    title: "새로운 아이템",
    completed: false,
    createdAt: "2021-10-03",
  };

  sampleData.push(dummyItem);
};

export default function Sample() {
  // 유저 데이터
  // 유저 데이터의 어떤 값을 보고 다음 페칭 로직이 돌아야함

  const { data, isLoading } = useQuery({
    queryKey: ["sampleData"],
    queryFn: async () => {
      return asyncFetchSampleData().then((res) => {
        return res.map(mapSampleDataItem);
      });
    },
  });

  const queryClient = useQueryClient();
  const onAddItem = useCallback(() => {
    addItemToSample();
    // ui 변경
    queryClient.invalidateQueries({
      queryKey: ["sampleData"],
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>니가가라하와이이</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col gap-4">
          <div>로딩 중...</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>니가가라하와이이</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col gap-4">
        {data?.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-md border p-4 shadow-md">
            <div>{item.title}</div>
            <div>{item.completed ? "완료" : "미완료"}</div>
          </div>
        ))}
        <button onClick={onAddItem}>새로운 아이템 추가</button>
      </main>
    </>
  );
}

// // same logic but without react query
// export default function Sample() {
//   const [data, setData] = useState<SampleData[] | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const onAddItem = useCallback(() => {
//     addItemToSample();
//     setData([...sampleData.map(mapSampleDataItem)]);
//   }, []);

//   useEffect(() => {
//     asyncFetchSampleData().then((res) => {
//       const mappedData = res.map(mapSampleDataItem);
//       setData(mappedData);
//       setIsLoading(false);
//     });
//   }, []);

//   if (isLoading) {
//     return (
//       <>
//         <Head>
//           <title>니가가라하와이이</title>
//           <link rel="icon" href="/favicon.ico" />
//         </Head>
//         <main className="flex min-h-screen flex-col gap-4">
//           <div>로딩 중...</div>
//         </main>
//       </>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>니가가라하와이이</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className="flex min-h-screen flex-col gap-4">
//         {data?.map((item) => (
//           <div key={item.id} className="flex gap-4 rounded-md border p-4 shadow-md">
//             <div>{item.title}</div>
//             <div>{item.completed ? "완료" : "미완료"}</div>
//           </div>
//         ))}
//         <button onClick={onAddItem}>새로운 아이템 추가</button>
//       </main>
//     </>
//   );
// }
