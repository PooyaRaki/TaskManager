import { Context } from '@api/context';
import { list, nonNull } from 'nexus';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { CategoryService } from './category.service';

export namespace CategoryResolver {

    export const fetchAll = async (type: ObjectDefinitionBlock<'Query'>): Promise<void> => {
        type.field('category', {
            type: nonNull(list('Category')),
            async resolve(_root: any, _args: any, ctx: Context): Promise<any> {
                return await CategoryService.fetchAll(ctx);
            }
        });
    }
}