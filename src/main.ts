import express from 'express';
import { Server } from 'server';
import { ApiConfiguration, ApplicationConfiguration, LogColorEnum, ServerBlockLogEnum, ServerLogger } from './utils';

/**
 * Initializes the main application inside of a Promise
 * 
 * @returns {Promise<void>}
 */
async function bootstrap(): Promise<void>
{
    const app = express();

    await Server.start();
    Server.applyMiddleware({
        app,
        path: ApiConfiguration.path,
    });

    app.get('/', async(req, resp) => {
        resp.send(`Please head to the '${ApiConfiguration.path}' location`);
    });

    app.listen({ port: ApplicationConfiguration.port }, () => {
        ServerLogger({
            block: ServerBlockLogEnum.SERVER,
            message: `Server ready on port ${ApplicationConfiguration.port}`,
            color: LogColorEnum.FgYellow,
        });
    })
}

bootstrap();