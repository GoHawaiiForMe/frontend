import { api } from './api';

export const getMakers = async (
  orderBy: string, 
  serviceArea: string, 
  serviceType: string, 
  pageParam: number,
keyword: string | undefined 
) => {

  try {
    const url = `/users/makers?page=${pageParam}&pageSize=5` +
                `${orderBy ? `&orderBy=${orderBy}` : ''}` +
                `${serviceArea ? `&serviceArea=${serviceArea}` : ''}` +
                `${serviceType ? `&serviceType=${serviceType}` : ''}` +
                `${keyword ? `&keyword=${keyword}` : ''}` ;
    const response = await api.get(url);

    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching makers:', error);
    throw error;
  }
};
