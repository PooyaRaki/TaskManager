import { EnvironmentEnums } from '@utils/enums';

/**
 * This is the main configuration of our application
 */
export const ApplicationConfiguration = {
    timezone: process.env.TZ,
    port: +(process.env.PORT ?? 3000),
    environment: process.env.NODE_ENV ?? 'development',

    IsEnvironment(environment: EnvironmentEnums): boolean
    {
        return this.environment === environment;
    },

    IsInDevelopment(): boolean
    {
        return this.environment === EnvironmentEnums.DEVELOPMENT;
    },

    IsInProduction(): boolean
    {
        return this.environment === EnvironmentEnums.PRODUCTION;
    }
}