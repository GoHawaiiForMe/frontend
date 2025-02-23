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
    nickName: z.string().min(1, { message: "닉네임을 입력해 주세요." }),
    email: z
      .string()
      .min(1, { message: "이메일을 입력해 주세요." })
      .email({ message: "이메일 형식이 아닙니다." }),
    phoneNumber: z
      .string()
      .regex(/^010\d{8}$/, { message: "010으로 시작하고 숫자만 입력해 주세요." }),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, { message: "비밀번호 확인란을 입력해 주세요." }),
    role: z.enum(["MAKER", "DREAMER"], { message: "역할을 선택해 주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const editDreamerSchema = z
  .object({
    nickName: z.string().min(1, { message: "닉네임을 입력해 주세요." }),
    email: z.string().min(1, { message: "이메일을 입력해 주세요." }),
    phoneNumber: z
      .string()
      .regex(/^010\d{8}$/, { message: "010으로 시작하고 숫자만 입력해 주세요." }),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    newConfirmPassword: z.string().optional(),
    selectedServices: z.array(z.string()).optional(),
    selectedLocations: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword || data.newConfirmPassword) {
      if (!data.password) {
        ctx.addIssue({
          code: "custom",
          path: ["password"],
          message: "현재 비밀번호를 입력해 주세요.",
        });
      }
      if (data.newPassword && data.newPassword.length < 6) {
        ctx.addIssue({
          code: "custom",
          path: ["newPassword"],
          message: "새 비밀번호는 최소 6자 이상이어야 합니다.",
        });
      }

      if (data.newPassword !== data.newConfirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["newConfirmPassword"],
          message: "새 비밀번호가 일치하지 않습니다.",
        });
      }
    }
  });

export type EditDreamerData = z.infer<typeof editDreamerSchema>;

export const editMakerSchema = z
  .object({
    nickName: z.string().min(1, { message: "닉네임을 입력해 주세요." }),
    email: z.string().min(1, { message: "이메일을 입력해 주세요." }),
    phoneNumber: z
      .string()
      .regex(/^010\d{8}$/, { message: "010으로 시작하고 숫자만 입력해 주세요." }),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    newConfirmPassword: z.string().optional(),
  })
  .refine((data) => !data.newPassword || data.password, {
    path: ["password"],
    message: "새 비밀번호를 설정하려면 현재 비밀번호를 입력해 주세요.",
  })
  .refine((data) => !data.newPassword || data.newPassword.length >= 6, {
    path: ["newPassword"],
    message: "새 비밀번호는 최소 6자 이상이어야 합니다.",
  })
  .refine((data) => !data.newPassword || data.newPassword === data.newConfirmPassword, {
    path: ["newConfirmPassword"],
    message: "새 비밀번호가 일치하지 않습니다.",
  });

export type EditMakerData = z.infer<typeof editMakerSchema>;

export const signUpOAuthSchema = z
  .object({
    nickName: z.string().min(1, { message: "닉네임을 입력해 주세요." }),
    phoneNumber: z
      .string()
      .regex(/^010\d{8}$/, { message: "010으로 시작하고 숫자만 입력해 주세요." }),
    role: z.enum(["MAKER", "DREAMER"], { message: "역할을 선택해 주세요." }),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    newConfirmPassword: z.string().optional(),
  })
  .refine((data) => !data.newPassword || data.password, {
    path: ["password"],
    message: "새 비밀번호를 설정하려면 현재 비밀번호를 입력해 주세요.",
  })
  .refine((data) => !data.newPassword || data.newPassword.length >= 6, {
    path: ["newPassword"],
    message: "새 비밀번호는 최소 6자 이상이어야 합니다.",
  })
  .refine((data) => !data.newPassword || data.newPassword === data.newConfirmPassword, {
    path: ["newConfirmPassword"],
    message: "새 비밀번호가 일치하지 않습니다.",
  });

export type SignUpOAuthData = z.infer<typeof signUpOAuthSchema>;
