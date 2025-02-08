import { api } from './api';

export const getMakers = async (orderBy: string, serviceArea: string, serviceType: string, keyword: string) => {
  //함수 파라미터, 여기서 페스 에서 참조
  try {
    // Construct the URL with conditional 
    const url = `/users/makers?page=1&pageSize=5` +
                `${orderBy ? `&orderBy=${orderBy}` : ''}` +
                `${serviceArea ? `&serviceArea=${serviceArea}` : ''}` +
                `${serviceType ? `&serviceType=${serviceType}` : ''}` +
                `${keyword ? `&keyword=${keyword}` : ''}`;
//keyword 빈 값으로. '' 기본 값으로 
    const response = await api.get(url);

    console.log(response); //서울 장미(검색바) 등 유동적으로 바뀌겠끔 , orderBy 필터 가 적용 되야 하니. 
    return response;
  } catch (error) {
    console.error('Error fetching makers:', error);
    throw error;
  }
};

getMakers