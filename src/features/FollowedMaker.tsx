import FollowedCard, { FollowedCardProps } from "@/components/Common/FollowedCard";
import followService from "../services/followService";
import { useQuery } from "@tanstack/react-query";
import loading from "@public/assets/icon_loading.gif";
import Image from "next/image";
import Layout from "@/components/Common/Layout";
import luggage from "@public/assets/icon_luggage.svg";
import Button from "@/components/Common/Button";
import { useRouter } from "next/router";

const fetchFollowData = () => {
  const followData = followService.getFollow(1, 10);
  return followData;
};

export default function FollowMaker() {
  const { data: followedItems, isLoading } = useQuery({
    queryKey: ["followedItems"],
    queryFn: fetchFollowData,
  });

  const router = useRouter();

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
  return (
    <>
      <div className="-mx-[260px] bg-color-gray-50 py-6">
        <p className="semibold px-[260px] text-xl">찜한 Maker</p>
      </div>
      <Layout bodyClass="bg-gray">
        <div className="mb-8 h-0.5 bg-color-line-200 mobile:-mx-[24px] tablet:-mx-[72px] pc:-mx-[260px]"></div>

        {followedItems && followedItems.length > 0 ? (
          followedItems.map((item: FollowedCardProps, index: number) => (
            <div className="items-center justify-center gap-4 pc:grid pc:grid-cols-2 mobile-tablet:flex mobile-tablet:flex-col card:flex card:flex-col">
              <FollowedCard
                key={index}
                image={item.image}
                nickName={item.nickName}
                gallery={item.gallery}
                averageRating={item.averageRating}
                totalReviews={item.totalReviews}
                totalFollows={item.totalFollows}
                totalConfirms={item.totalConfirms}
                serviceTypes={item.serviceTypes}
              />
            </div>
          ))
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
      </Layout>
    </>
  );
}
