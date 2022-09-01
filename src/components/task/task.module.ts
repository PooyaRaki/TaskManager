import { extendType, ObjectDefinitionBlock } from 'nexus/dist/core';
import { TaskMutation } from '@components/task/task.mutation';
import { TaskResolver } from '@components/task/task.resolver';

export * from './task.type';


export const TaskQuery = extendType({
    type: 'Query',
    async definition(type: ObjectDefinitionBlock<'Query'>): Promise<void> {
        await TaskResolver.fetchAll(type);
    },
});

export const TaskMutations = extendType({
    type: 'Mutation',
    definition(type: ObjectDefinitionBlock<'Mutation'>): void {
        TaskMutation.done(type);
        TaskMutation.undone(type);
        TaskMutation.create(type);
    },
});