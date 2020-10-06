import * as bCrypt from 'bcrypt';

/**
 * @function
 * @description Creates hash of given password.
 * @param password
 * @return Hashed password.
 */
export const createHash = async (password: string) => {
  return bCrypt.hash(password, 10);
};

/**
 * @function
 * @description Compares the given password with the hash password.
 * @param password
 * @param hashPassword
 * @return True if passwords are equal, false otherwise.
 */
export const isValidPassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return bCrypt.compare(password, hashPassword);
};
