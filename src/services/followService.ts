import { api } from "./api";

interface FollowedCardProps {
  image: string;
  nickName: string;
  gallery: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  serviceTypes: string[];
}

const followService = {
  getFollow: async (page: number = 1, pageSize: number = 10): Promise<FollowedCardProps[]> => {
    try {
      const response = await api.get<{ totalCount: number; list: any[] }, Record<string, unknown>>(
        `/users/following?page=${page}&pageSize=${pageSize}`,
      );

      const followedItems = response.list.map((item) => ({
        image: item.maker.image,
        nickName: item.maker.nickName,
        gallery: item.maker.gallery,
        averageRating: item.maker.averageRating,
        totalReviews: item.maker.totalReviews,
        totalFollows: item.maker.totalFollows,
        totalConfirms: item.maker.totalConfirms,
        makerId: item.makerId,
        serviceTypes: item.maker.serviceTypes,
      }));
      return followedItems;
    } catch (error) {
      console.error("찜한 메이커 get 실패", error);
      throw error;
    }
  },
};

export default followService;
