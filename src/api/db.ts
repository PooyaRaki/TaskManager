import { StatusEnum } from "@utils/enums/status.enum";

export interface Task {
    id: number,
    title: string,
    description: string | null,
    categoryId: number,
    status: number,
}

export interface Category {
    id: number,
    title: string,
    description: string | null,

    step: number,
    taskCount: number,
    tasksCompletedCount: number,

    status: number,
}

export interface Db {
    tasks: Task[],
    categories: Category[],
}

export const db: Db = {
    tasks: [
        {
            id: 1,
            status: StatusEnum.DONE,
            categoryId: 1,
            title: 'Setup',
            description: 'In this task the virtual office infrastructure should be setup.',
        },
        {
            id: 2,
            status: StatusEnum.DONE,
            categoryId: 1,
            title: 'Set goal',
            description: 'The general goal of the business is defined now.',
        },
        {
            id: 3,
            status: StatusEnum.DONE,
            categoryId: 2,
            title: 'Road map',
            description: 'The road map of the team is created here.',
        },
        {
            id: 4,
            status: StatusEnum.OPEN,
            categoryId: 6,
            title: 'Road map - Communication',
            description: 'The road map of the team is created here.',
        },
    ],
    categories: [
        {
            id: 1,
            step: 1,
            status: StatusEnum.DONE,
            taskCount: 2,
            tasksCompletedCount: 2,

            title: 'Founding',
            description: 'Fundamental settings of the business',
        },
        {
            id: 2,
            step: 2,
            status: StatusEnum.DONE,
            taskCount: 1,
            tasksCompletedCount: 1,

            title: 'Communication',
            description: 'The general communication purposes are defined in this category',
        },
        {
            id: 3,
            step: 3,
            status: StatusEnum.OPEN,
            taskCount: 0,
            tasksCompletedCount: 0,

            title: 'Discovery 3',
            description: 'The general discovery processes are defined in this category',
        },
        {
            id: 4,
            step: 2,
            status: StatusEnum.OPEN,
            taskCount: 0,
            tasksCompletedCount: 0,

            title: 'Discovery 4',
            description: 'Discovery 4th level',
        },
        {
            id: 5,
            step: 2,
            status: StatusEnum.OPEN,
            taskCount: 0,
            tasksCompletedCount: 0,

            title: 'Discovery 5',
            description: 'Discovery 5th level',
        },
        {
            id: 6,
            step: 2,
            status: StatusEnum.OPEN,
            taskCount: 1,
            tasksCompletedCount: 0,

            title: 'Discovery 6',
            description: 'Discovery 6th level',
        }
    ]
}