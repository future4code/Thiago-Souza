import * as bcrypt from "bcryptjs";

export async function encryptPassword(password: string): Promise<string> {
  const rounds = Number(process.env.CRYPTO_ROUNDS);
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(plainPassword: string, hashPassword: string)
: Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashPassword);
}
