import { UserModel } from '../../data';
import { CustomError } from '../../domain';
import { RegisterUseDto } from '../../domain/dtos/auth/register-user.dto';
export class AuthService {
  // DI
  constructor(){

  }



  public async registerUser(RegisterUseDto: RegisterUseDto){

    const existUser = await UserModel.findOne({email: RegisterUseDto.email});

    if(existUser){
      throw CustomError.badRequest("Email already exists")
    } 

    return "todo ok!"

  }
}