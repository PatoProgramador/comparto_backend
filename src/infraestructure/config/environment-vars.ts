import Joi from "joi";
import dotenv from "dotenv";

dotenv.config();

export type ReturnEnviromentVars = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
};

type ValidationEnviromentVars = {
  error: Joi.ValidationError | undefined;
  value: ReturnEnviromentVars;
};

function validateEnvVars(vars: NodeJS.ProcessEnv): ValidationEnviromentVars {
  const envShema = Joi.object({
    PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(3306),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow("").optional(),
    DB_NAME: Joi.string().required(),
  }).unknown(true);
  const { error, value } = envShema.validate(vars);

  return { error, value };
}

const loadEnvVars = (): ReturnEnviromentVars => {
  const result = validateEnvVars(process.env);
  if (result.error) {
    throw new Error(`Invalid environment variables: ${result.error.message}`);
  }
  const value = result.value;
  return {
    PORT: value.PORT,
    DB_HOST: value.DB_HOST,
    DB_PORT: value.DB_PORT,
    DB_USER: value.DB_USER,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_NAME: value.DB_NAME,
  };
};
