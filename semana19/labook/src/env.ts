import dotenv from "dotenv";

function validateEnvironment() {
  const requiredsEnvironmentVariable = [
    "NODE_PORT",
    "TOKEN_SECRET_KEY",
    "TOKEN_DURATION",
    "CRYPTO_ROUNDS",
    "DATABASE_TYPE",
    "DATABASE_HOST",
    "DATABASE_PORT",
    "DATABASE_SCHEMA",
    "DATABASE_USER",
    "DATABASE_PASSWORD",
    "DOCS_PATH"
  ];

  const missingVariables = [];

  for (const varible of requiredsEnvironmentVariable)
    if (!process.env[varible])
      missingVariables.push(varible);

  if (missingVariables.length)
    //eslint-disable-next-line max-len
    throw new Error(`The following envioroment varibles are requireds:\n\t${missingVariables.join("\n\t")}`);
}

dotenv.config();

validateEnvironment();
