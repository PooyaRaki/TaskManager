import { nonNull } from 'nexus';
import { Context } from '@api/context';
import { CategoryService } from './category.service';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { CategoryCreateDto, CategoryDoneDto, CategoryUnDoneDto } from './dtos/category.dto';

export namespace CategoryMutation {
    export const create = async (type: ObjectDefinitionBlock<'Mutation'>): Promise<void> => {
        type.field('createCategory', {
            type: nonNull('Category'),
            args: CategoryCreateDto,
            async resolve(_root, arg, context: Context): Promise<any> {
                return await CategoryService.create(context, arg);
            }
        });
    }

    export const done = async (type: ObjectDefinitionBlock<'Mutation'>): Promise<void> => {
        type.field('closeCategory', {
            type: nonNull('Category'),
            args: CategoryDoneDto,
            async resolve(_root, arg, context: Context): Promise<any> {
                return await CategoryService.done(context, arg);
            }
        });
    }

    export const undone = async (type: ObjectDefinitionBlock<'Mutation'>): Promise<void> => {
        type.field('openCategory', {
            type: nonNull('Category'),
            args: CategoryUnDoneDto,
            async resolve(_root, arg, context: Context): Promise<any> {
                return await CategoryService.undone(context, arg);
            }
        });
    }
}