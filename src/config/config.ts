import dotenv from "dotenv";
dotenv.config();

export const config: Application.IConfiguration = {
  authenticationServiceBaseUrl:
    process.env.REACT_APP_AUTHENTICATION_SERVICE_BASE_URL,
  appBaseUrl: process.env.REACT_APP_BASE_URL,
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
};

export default config;
