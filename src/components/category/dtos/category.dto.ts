import { nonNull, stringArg } from 'nexus';
import { ArgsRecord, intArg, Maybe } from 'nexus/dist/core';

export const CategoryCreateDto: Maybe<ArgsRecord> = {
    title: nonNull(stringArg()),
    description: nonNull(stringArg()),
}

export const CategoryDoneDto: Maybe<ArgsRecord> = {
    id: nonNull(intArg()),
}
export const CategoryUnDoneDto: Maybe<ArgsRecord> = {
    id: nonNull(intArg()),
}