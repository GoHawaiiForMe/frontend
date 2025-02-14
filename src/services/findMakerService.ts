import { api } from "./api";
export type ServiceType =
  | "SHOPPING"
  | "FOOD_TOUR"
  | "ACTIVITY"
  | "CULTURE"
  | "FESTIVAL"
  | "RELAXATION"
  | "REQUEST"
  | "PENDING"
  | "CONFIRMED";

export interface Maker {
  id: string;
  nickName: string;
  description: string;
  detailDescription: string;
  image: string;
  gallery: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  serviceTypes: ServiceType[];
  serviceArea: string[];
  isFollowed: boolean;
}

interface MakerResponse {
  totalCount: number;
  list: Maker[];
}

export const getMakers = async (
  orderBy: string,
  serviceArea: string,
  serviceType: string,
  pageParam?: number,
  pageSize?: number,
  keyword?: string,
): Promise<MakerResponse> => {
  try {
    const url =
      `/users/makers?page=${pageParam}&pageSize=${pageSize}` +
      `${orderBy ? `&orderBy=${orderBy}` : ""}` +
      `${serviceArea ? `&serviceArea=${serviceArea}` : ""}` +
      `${serviceType ? `&serviceType=${serviceType}` : ""}` +
      `${keyword ? `&keyword=${keyword}` : ""}`;
    const response = await api.get(url);

    console.log(response);
    return response as MakerResponse;
  } catch (error) {
    console.error("Error fetching makers:", error);
    throw error;
  }
};
