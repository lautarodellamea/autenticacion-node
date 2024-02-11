// el controlador no es mas que una clase que nos permita hacer inyeccion de dependencias y colocar todos los handlers

import { Request, Response } from "express";
import { RegisterUseDto } from "../../domain";
import { AuthService } from "../services/auth.services";

export class AuthController {
  // DI
  constructor(
    public readonly authService: AuthService
  ) {}

  registerUser = (req: Request, res: Response) => {
    const [error ,registerDto] = RegisterUseDto.create(req.body);
    if(error) return res.status(400).json(error)


    this.authService.registerUser(registerDto!).then((user)=> res.json(user))
  };

  loginrUser = (req: Request, res: Response) => {
    res.json("loginUser");
  };

  validateEmail = (req: Request, res: Response) => {
    res.json("validateEmail");
  };
}
