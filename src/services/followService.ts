import { api } from "./api";
import { BAD_REQUEST } from "@/utils/errorStatus";

export interface FollowedCardProps {
  image: string;
  nickName: string;
  gallery: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  serviceTypes: string[];
  description: string;
  makerId: string;
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
        description: item.maker.description,
      }));
      return followedItems;
    } catch (error) {
      console.error("찜한 메이커 get 실패하였습니다.", error);
      throw error;
    }
  },
  postFollow: async (makerId: string) => {
    try {
      const response = await api.post("/follow", { makerId });
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("이미 찜한 메이커입니다다.");
      }
    }
  },
  deleteFollow: async (makerId: string) => {
    try {
      const response = await api.delete("/follow", { data: { makerId } });
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("찜하지 않은 메이커입니다.");
      }
    }
  },
};

export default followService;
