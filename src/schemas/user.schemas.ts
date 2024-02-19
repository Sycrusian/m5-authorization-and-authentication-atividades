import { z } from "zod";

export const userSchema = z.object({
   id: z.number().positive(),
   name: z.string().min(1),
   email: z.string().min(1).email(),
   password: z.string().min(8)
});

export type TUser = z.infer<typeof userSchema>;

export const userCreateSchema = userSchema.omit({ id: true });

export type TUserCreate = z.infer<typeof userCreateSchema>;

export const userReturnSchema = userSchema.omit({ password: true });

export type TUserReturn = z.infer<typeof userReturnSchema>;

export const userLoginSchema = userSchema.omit({ id: true, name: true });

export type TUserLogin = z.infer<typeof userLoginSchema>;

export type TLoginReturn = {
   token: string;
   user: TUserReturn;
};
