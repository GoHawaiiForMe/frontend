import { api } from './api';

export const getMakers = async (orderBy: string, serviceArea: string, serviceType: string, keyword: string) => {
  //함수 파라미터, 여기서 페스 에서 참조
  try {
    const response = await api.get(`/users/makers?page=1&pageSize=5&orderBy=${orderBy}&serviceArea=${serviceArea}&serviceType=${serviceType}&keyword=${keyword}`);

    console.log(response); //서울 장미(검색바) 등 유동적으로 바뀌겠끔 , orderBy 필터 가 적용 되야 하니. 
    return response;
  } catch (error) {
    console.error('Error fetching makers:', error);
    throw error;
  }
};

getMakers