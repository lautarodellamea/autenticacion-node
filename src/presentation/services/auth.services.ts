import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
export class AuthService {
  // DI
  constructor() {}

  public async registerUser(RegisterUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: RegisterUserDto.email });

    if (existUser) {
      throw CustomError.badRequest("Email already exists");
    }

    try {
      const user = new UserModel(RegisterUserDto);

      // Encriptar contraseña
      user.password = bcryptAdapter.hash(RegisterUserDto.password);
      await user.save();

      // JWT <--- para mantener la autenticacion del usuario

      // Email de confirmación
      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token: "ABC" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(LoginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: LoginUserDto.email });
    if (!user) {
      // aca podemos decir "Email y password no son validos cosa de que un atacante no seppa cual de los dos esta mal"
      throw CustomError.badRequest("Email not exist");
    }

    const isMatching = bcryptAdapter.compare(
      LoginUserDto.password,
      user.password
    );
    if (!isMatching) {
      // aca podemos decir "Email y password no son validos cosa de que un atacante no seppa cual de los dos esta mal"
      throw CustomError.badRequest("Password is not valid");
    }

    try {
      const { password, ...userEntity } = UserEntity.fromObject(user);
      return { user: userEntity, token: "ABC" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

    // return {
    //   user: {... info del usuario},
    //   token: "ABC"
    // }
  }
}
