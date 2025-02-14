import FollowedCard, { FollowedCardProps } from "@/components/Common/FollowedCard";
import followService from "../services/followService";
import { useInfiniteQuery } from "@tanstack/react-query";
import loading from "@public/assets/icon_loading.gif";
import Image from "next/image";
import Layout from "@/components/Common/Layout";
import luggage from "@public/assets/icon_luggage.svg";
import Button from "@/components/Common/Button";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fetchFollowData = async ({ pageParam = 1 }) => {
  return await followService.getFollow(pageParam, 10);
};

export default function FollowMaker() {
  const router = useRouter();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["followedItems"],
    queryFn: fetchFollowData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : null;
    },
  });

  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center">
        <Image src={loading} alt="로딩중" />
      </div>
    );
  }

  const handleGoToFindMaker = () => {
    router.push("/finding-maker");
  };

  const handleGoToMaker = (makerId: string) => {
    router.push(`/maker-detail/${makerId}`);
  };

  const allItems = data?.pages.flatMap((page) => page) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <>
      <div className="-mx-[260px] bg-color-gray-50 py-6">
        <p className="semibold px-[260px] text-xl">찜한 Maker</p>
      </div>
      <Layout bodyClass="bg-gray">
        <div className="mb-8 h-0.5 bg-color-line-200 mobile:-mx-[24px] tablet:-mx-[72px] pc:-mx-[260px]"></div>

        {allItems.length > 0 ? (
          <div className="gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col card:flex card:flex-col">
            {allItems.map((item: FollowedCardProps, index: number) => (
              <div key={index} className="cursor-pointer">
                <FollowedCard
                  makerId={item.makerId}
                  image={item.image}
                  nickName={item.nickName}
                  gallery={item.gallery}
                  averageRating={item.averageRating}
                  totalReviews={item.totalReviews}
                  totalFollows={item.totalFollows}
                  totalConfirms={item.totalConfirms}
                  serviceTypes={item.serviceTypes}
                  onClick={() => handleGoToMaker(item.makerId)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="pc:grid-cols-0 flex flex-col items-center justify-center pt-10">
            <Image src={luggage} alt="캐리어 이미지" width={500} />
            <p className="bold text-center text-xl text-gray-500">찜한 Maker가 없습니다.</p>
            <div className="mt-16 w-56">
              <Button
                label="Maker 찜하러 가기"
                className="px-5 text-color-gray-50"
                onClick={handleGoToFindMaker}
              />
            </div>
          </div>
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <Image src={loading} alt="로딩중" />
          </div>
        )}
        <div ref={ref} className="h-10"></div>
      </Layout>
    </>
  );
}
