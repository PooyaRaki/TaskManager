import { IUniqueId } from '@utils/interfaces';
import { objectType } from 'nexus';
import { TaskStatusType } from './enums/taskStatus.enum';

export const TaskType = objectType({
    name: 'Task',

    definition(t) {
        t.implements(IUniqueId);
        t.string('title', { description: 'Task title' });
        t.string('description', { description: 'Summary of the task' });
        t.int('categoryId', { description: 'The category this task belongs to' });
        t.field(
            'status',
            {
                type: TaskStatusType,
                description: 'The status of the task i.e. published, unpublished, locked, ...',
            }
        );
    },
});