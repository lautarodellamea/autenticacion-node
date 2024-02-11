import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const bcryptAdapter = {
  
  // metodo que encripta la contraseña
  hash: (password: string) => {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },

  // metodo que compara las contraseñas
  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed);
  },
};
