import { StatusEnum } from '@utils/enums/status.enum';
import { enumType } from 'nexus';

export const CategoryStatusType = enumType({
    members: StatusEnum,
    name: 'CategoryStatusType',
    description: 'This is the status of the category i.e. category is done or is open',
});