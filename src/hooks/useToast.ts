import { toast } from "react-toastify";

export const useToast = () => {
  const showToast = (message: string) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return { showToast };
}; 