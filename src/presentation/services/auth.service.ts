import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { EmailService } from "./email.service";
import jwt from "jsonwebtoken";
export class AuthService {
  // DI
  constructor(private readonly EmailService: EmailService) {}

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
      await this.sendEmailValidationLink(user.email);

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({
        id: user.id,
        email: user.email,
      });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return { user: userEntity, token: token };
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

    const { password, ...userEntity } = UserEntity.fromObject(user);

    // generamos el token
    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });

    if (!token) throw CustomError.internalServer("Error while creating JWT");

    return { user: userEntity, token: token };
  }

  // mecanismo del envio de nuestro correo
  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error while creating JWT");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `
    <h1>Validate your email</h1>
    <p>Click in the link below to validate your email</p>
    <a href="${link}">Validate Email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSent = await this.EmailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error while sending email");

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateEmail(token);
    if (!payload) throw CustomError.unauthorized("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer("Email not exists");

    user.emailValidated = true;
    await user.save();

    return true;
  };
}
