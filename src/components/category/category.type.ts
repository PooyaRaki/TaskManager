import { objectType } from 'nexus';
import { IUniqueId } from '@utils/interfaces';
import { CategoryStatusType } from './enums/categoryStatus.enum';

export const CategoryType = objectType({
    name: 'Category',

    definition(t) {
        t.implements(IUniqueId);
        t.string('title', { description: 'Category title' });
        t.string('description', { description: 'Category description' });
        t.nullable.int('taskCount', { description: 'The number of tasks in this category' });
        t.nullable.int( 'taskCompletedCount', { description: 'The number of completed tasks' });
        t.int('step', { description: 'The order of this category among all other ones' });
        t.field('status', {
            type: CategoryStatusType,
            description: 'Status of the category i.e. published, unpublished, ...',
        });
    },
});