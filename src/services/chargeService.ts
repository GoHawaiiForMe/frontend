import { api } from "./api";

const chargeService = {
  createPayment: async (amount: number,paymentId:string) => {

    const response = await api.post<any,any>("/payments", {
      paymentId,
      orderName: "코코넛 충전",
      amount: amount,
      method: "CARD",
      currency: "KRW",
    });
    console.log(response);

    const payId = response.id;
    return payId;
  },

  

  completePayment: async (payId: string) => {
    const response = await api.post<any,any>(`/payments/complete`, {
      paymentId: payId,
    });
    return response;
  },

};

export default chargeService;
