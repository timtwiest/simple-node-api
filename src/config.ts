import dotenv from 'dotenv';

dotenv.config();

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  env: getEnvironmentVariable('NODE_ENV'),
  app: {
    appName: getEnvironmentVariable('APP_NAME'),
    debug: getEnvironmentVariable('IS_DEBUG') === 'true',
    port: getEnvironmentVariable('APP_PORT'),
  },
};
