"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateEnvVars(vars) {
    const envShema = joi_1.default.object({
        PORT: joi_1.default.number().required(),
        DB_HOST: joi_1.default.string().required(),
        DB_PORT: joi_1.default.number().default(3306),
        DB_USER: joi_1.default.string().required(),
        DB_PASSWORD: joi_1.default.string().allow('').optional(),
        DB_NAME: joi_1.default.string().required()
    }).unknown(true);
    const { error, value } = envShema.validate(vars);
    return { error, value };
}
const loadEnvVars = () => {
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
        DB_NAME: value.DB_NAME
    };
};
