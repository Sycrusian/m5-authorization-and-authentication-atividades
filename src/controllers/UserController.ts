import { injectable, inject } from "tsyringe";
import { UserServices } from "../services/UserServices";
import { Request, Response } from "express";

@injectable()
export class UserController {
  constructor(@inject("UserServices") private userServices: UserServices) {}

  async register(req: Request, res: Response): Promise<Response> {
    const response = await this.userServices.register(req.body);

    return res.status(201).json(response);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const response = await this.userServices.login(req.body);

    return res.status(200).json(response);
  }

  async getUser(_: Request, res: Response): Promise<Response> {
    const { id } = res.locals.decode;
    
    const response = await this.userServices.getUser(id);

    return res.status(200).json(response);
  }
}