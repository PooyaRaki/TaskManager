import { interfaceType } from 'nexus';
import { InterfaceDefinitionBlock } from 'nexus/dist/core';

export const IUniqueId = interfaceType({
    name: 'UniqueId',
    definition(t: InterfaceDefinitionBlock<'UniqueId'>): void {
        t.int('id', { description: 'The identifier for the resource' });
    },
    resolveType(data):any {
        return data;
    }
});