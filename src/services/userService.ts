import { api } from "./api"

const userService = {

  // 추가 예정

  signUp: async (data: any) => {
    try {
      const response = await api.post("/user/signup", data);
      console.log("회원가입 성공:", response);
      return response;
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  },
};

export default userService;