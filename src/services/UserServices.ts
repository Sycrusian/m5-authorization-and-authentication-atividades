import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { TLoginReturn, TUserCreate, TUserLogin, TUserReturn, userReturnSchema } from "../schemas/user.schemas";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

@injectable()
export class UserServices {
  async register(body: TUserCreate): Promise<TUserReturn> {
    const hashPassword = await bcrypt.hash(body.password, 12);

    const newUser: TUserCreate = {
      name: body.name,
      email: body.email,
      password: hashPassword
    };

    const data = await prisma.user.create({ data: newUser });

    return userReturnSchema.parse(data);
  }

  async login(body: TUserLogin): Promise<TLoginReturn> {
    const user = await prisma.user.findFirst({ where: { email: body.email }});

    if (!user) {
      throw new AppError("Email or password incorrect.", 403);
    }

    const compare = await bcrypt.compare(body.password, user.password);

    if (!compare) {
      throw new AppError("Email or password incorrect.", 403);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "24h" });

    return {
      token,
      user: userReturnSchema.parse(user)
    };
  }

  async getUser(id: number): Promise<TUserReturn> {
    const user = await prisma.user.findFirst({ where: { id }});

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return userReturnSchema.parse(user);
  }
}