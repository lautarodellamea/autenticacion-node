import { regularExps } from "../../../config";

export class RegisterUseDto {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUseDto?] {
    const { name, email, password } = object;

    if (!name) {
      return ["Missing name", undefined];
    }

    if (!email) {
      return ["Missing email", undefined];
    }

    if (!regularExps.email.test(email)) {
      return ["Invalid email", undefined];
    }

    if (!password) {
      return ["Missing password", undefined];
    }

    if (password.length < 6) {
      return ["Password must be at least 6 characters", undefined];
    }

    return [undefined, new RegisterUseDto(name, email, password)];
  }
}
