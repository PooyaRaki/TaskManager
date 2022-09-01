import { join } from 'path';
import { makeSchema } from 'nexus';
import * as schemas from '@components/app.module';

export const schema = makeSchema({
    types: schemas,
    outputs: {
        typegen: join(process.cwd(), 'src/api/graphql.type.ts'),
        schema: join(process.cwd(), 'src/api/schema.graphql'),
    },
    contextType: {
        module: join(process.cwd(), 'src/api/context.ts'),
        export: 'Context',
    }
});