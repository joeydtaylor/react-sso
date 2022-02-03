declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development";
    REACT_APP_AUTHENTICATION_SERVICE_BASE_URL: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_API_BASE_URL: string;
  }
}
