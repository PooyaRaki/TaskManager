import { nonNull, stringArg } from 'nexus';
import { ArgsRecord, intArg, Maybe } from 'nexus/dist/core';

export const TaskCreateDto: Maybe<ArgsRecord> = {
    title: nonNull(stringArg()),
    description: nonNull(stringArg()),
    categoryId: nonNull(intArg()),
}

export const TaskDoneDto: Maybe<ArgsRecord> = {
    id: nonNull(intArg()),
}
export const TaskUnDoneDto: Maybe<ArgsRecord> = {
    id: nonNull(intArg()),
}