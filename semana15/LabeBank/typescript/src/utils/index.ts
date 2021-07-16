const maxCPF = 99999999999;
export const cpfLength = 11;

function unknownToCPF(cpf: unknown): string {
  if (typeof cpf !== "string" &&  typeof cpf !== "number")
    return "";

  if (typeof cpf === "string" && cpf.length !== cpfLength)
    return "";

  const CPFNumber = Number(cpf);

  if (!isFinite(CPFNumber) || cpf < 0 || CPFNumber > maxCPF)
    return "";

  return CPFNumber.toString().padStart(cpfLength, "0");
}

export function isValidCPF(cpf: unknown): boolean {
  const CPF = unknownToCPF(cpf);
  if (!CPF)
    return false;

  let dv1Sum = 0;
  let dv2Sum = 0;
  let index = 0;

  for (; index < cpfLength - 2; index++) {
    const digit = Number(CPF[index]);
    const weigth = cpfLength - index;

    dv1Sum += digit * (weigth - 1);
    dv2Sum += digit * weigth;
  }

  const dv1Mod = dv1Sum % cpfLength;
  const dv1 = dv1Mod  < 2 ? 0 : cpfLength - dv1Mod;

  if (dv1.toString() !== CPF[cpfLength - 2])
    return false;

  dv2Sum +=  dv1 * (cpfLength - index);
  const dv2Mod = dv2Sum % cpfLength;
  const dv2 = dv2Mod < 2 ? 0 : cpfLength - dv2Mod;

  if (dv2.toString() !== CPF[cpfLength - 1])
    return false;

  return true;
}
