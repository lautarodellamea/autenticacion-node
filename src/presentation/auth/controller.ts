// el controlador no es mas que una clase que nos permita hacer inyeccion de dependencias y colocar todos los handlers

import { Request, Response } from "express";

export class AuthController {
  // DI
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json("registerUser");
  };

  loginrUser = (req: Request, res: Response) => {
    res.json("loginUser");
  };

  validateEmail = (req: Request, res: Response) => {
    res.json("validateEmail");
  };

}
