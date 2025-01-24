import FollowedCard, { FollowedCardProps } from "@/components/Common/FollowedCard";
import followService from "../services/followService";
import { useQuery } from "@tanstack/react-query";
import loading from "@public/assets/icon_loading.gif";
import Image from "next/image";

const fetchFollowData = () => {
  const followData = followService.getFollow(1, 10);
  return followData;
};

export default function FollowMaker() {
  const {
    data: followedItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["followedItems"],
    queryFn: fetchFollowData,
  });
  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center">
        <Image src={loading} alt="로딩중" />
      </div>
    );
  }
  return (
    <>
      <div className="py-6">
        <p className="text-xl font-semibold">찜한 Maker</p>
      </div>
      <div className="mb-8 h-0.5 bg-color-line-200 mobile:-mx-[24px] tablet:-mx-[72px] pc:-mx-[260px]"></div>

      <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col card:flex card:flex-col">
        {followedItems && followedItems.length > 0 ? (
          followedItems.map((item: FollowedCardProps, index: number) => (
            <FollowedCard
              key={index}
              image={item.image}
              nickName={item.nickName}
              gallery={item.gallery}
              averageRating={item.averageRating}
              totalReviews={item.totalReviews}
              totalFollows={item.totalFollows}
              totalConfirms={item.totalConfirms}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">찜한 Maker가 없습니다.</p>
        )}
      </div>
    </>
  );
}
