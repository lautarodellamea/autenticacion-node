
import { CustomError } from "../errors/custom.error";

// objetivo de de el user.entity
// si yo quiero regresar un usuario, regresare este usuario y no mi modelo de mongoose cosa de no hacer la dependencia y amarrar mi app a mongoose, porque si cambiamos mongoose o algo pasa con esta parte deberemos cambiar muchas cosas en efecto domino, mejor depender de esta entidad y no de mongoose

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string,
    
  ) {}

  static fromObject(object: {[key:string]: any}){
    const {id, _id, name, email, emailValidated, password, role, img} = object

    if(!_id && id){
      throw CustomError.badRequest("Missing id");
    }

    if(!name){
      throw CustomError.badRequest("Missing name");
    }

    if(!email){
      throw CustomError.badRequest("Missing email");
    }

    if(emailValidated === undefined){
      throw CustomError.badRequest("Missing emailValidated");
    }

    if(!password ){
      throw CustomError.badRequest("Missing password");
    }

    if(!role){
      throw CustomError.badRequest("Missing role");
    }

    return new UserEntity(id || _id, name, email, emailValidated, password, role, img);

  }




}
