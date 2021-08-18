import * as bcrypt from "bcryptjs";

export async function encryptPassword(password: string): Promise<string> {
  const rounds = Number(process.env.CRYPTO_ROUNDS);
  const salt = await bcrypt.genSalt(rounds);
  return bcrypt.hash(password, salt);
}
