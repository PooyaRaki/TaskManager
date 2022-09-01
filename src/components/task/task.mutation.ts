import { nonNull } from 'nexus';
import { Context } from '@api/context';
import { TaskService } from './task.service';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { TaskCreateDto, TaskDoneDto, TaskUnDoneDto } from './dtos/task.dto';

export namespace TaskMutation {
    export const create = async (type: ObjectDefinitionBlock<'Mutation'>): Promise<void> => {
        type.field('createTask', {
            type: nonNull('Task'),
            args: TaskCreateDto,
            async resolve(_root, arg, context: Context): Promise<any> {
                return await TaskService.create(context, arg);
            }
        })
    }

    export const done = async (type: ObjectDefinitionBlock<'Mutation'>): Promise<void> => {
        type.field('doneTask', {
            type: nonNull('Task'),
            args: TaskDoneDto,
            async resolve(_root, arg, context: Context): Promise<any> {
                return await TaskService.done(context, arg);
            }
        });
    }

    export const undone = async (type: ObjectDefinitionBlock<'Mutation'>): Promise<void> => {
        type.field('undoneTask', {
            type: nonNull('Task'),
            args: TaskUnDoneDto,
            async resolve(_root, arg, context: Context): Promise<any> {
                return await TaskService.undone(context, arg);
            }
        })
    }
}