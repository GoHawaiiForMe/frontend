import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "이메일을 입력해 주세요.").email("이메일 형식이 아닙니다."),
  password: z
    .string()
    .nonempty("비밀번호를 입력해 주세요.")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    nickname: z.string().min(1, { message: "닉네임을 입력해 주세요." }),
    email: z
      .string()
      .min(1, { message: "이메일을 입력해 주세요." })
      .email({ message: "이메일 형식이 아닙니다." }),
    phone: z.string().regex(/^010\d{8}$/, { message: "010으로 시작하고 숫자만 입력해 주세요." }),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, { message: "비밀번호 확인란을 입력해 주세요." }),
    role: z.enum(["maker", "dreamer"], { message: "역할을 선택해 주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const editDreamerSchema = z
  .object({
    nickname: z.string().min(1, { message: "닉네임을 입력해 주세요." }),
    phone: z.string().regex(/^010\d{8}$/, { message: "010으로 시작하고 숫자만 입력해 주세요." }),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, { message: "비밀번호 확인란을 입력해 주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type EditDreamerData = z.infer<typeof editDreamerSchema>;
