import { Context } from '@api/context';
import { TaskService } from './task.service';
import { list, nonNull } from 'nexus';
import { ObjectDefinitionBlock } from 'nexus/dist/core';

export namespace TaskResolver {

    export const fetchAll = async (type: ObjectDefinitionBlock<'Query'>): Promise<void> => {
        type.field('tasks', {
            type: nonNull(list('Task')),
            async resolve(_root: any, _args: any, ctx: Context): Promise<any> {
                return await TaskService.fetchAll(ctx);
            }
        });
    }
}