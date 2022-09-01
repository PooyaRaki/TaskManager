import { ApolloServer } from 'apollo-server-express';
import { context, schema } from '@api/index';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApplicationConfiguration } from './utils';

/**
 * The main apollo server instance
 */
export const Server = new ApolloServer({
    schema,
    context,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApplicationConfiguration.IsInProduction()
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
});