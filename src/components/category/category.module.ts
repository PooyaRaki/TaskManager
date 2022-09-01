import { extendType, ObjectDefinitionBlock } from 'nexus/dist/core';
import { CategoryMutation } from '@components/category/category.mutation';
import { CategoryResolver } from '@components/category/category.resolver';


export * from './category.type';


export const CategoryQuery = extendType({
    type: 'Query',
    async definition(type: ObjectDefinitionBlock<'Query'>): Promise<void> {
        await CategoryResolver.fetchAll(type);
    },
});

export const CategoryMutations = extendType({
    type: 'Mutation',

    definition(type: ObjectDefinitionBlock<'Mutation'>): void {
        CategoryMutation.done(type);
        CategoryMutation.undone(type);
        CategoryMutation.create(type);
    },
});