import { StatusEnum } from '@utils/enums/status.enum';
import { enumType } from 'nexus';

export const TaskStatusType = enumType({
    members: StatusEnum,
    name: 'TaskStatusType',
    description: 'This is the status of the task i.e. task is done or is open',
});