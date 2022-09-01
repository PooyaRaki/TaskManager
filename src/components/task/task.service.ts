import { Context } from '@api/context';
import { Task } from '@api/db';
import { CategoryService } from '@components/category/category.service';
import { SystemMessagesConstants } from '@utils/constants/message.const';
import { StatusEnum } from '@utils/enums/status.enum';

export namespace TaskService {

    /**
     * Creates a new task
     *
     * @param  {Context} ctx Application context
     * @param  {any} args Arguments
     *
     * @returns {Promise<Task>} The newly created task
     */
    export const create = async (ctx: Context, args: any): Promise<Task> => {
        await CategoryService.validateCategory(ctx, args.categoryId);
        const task: Task = {
            id: fetchLatestTaskId(ctx) + 1,

            title: args.title,
            status: StatusEnum.OPEN,
            categoryId: args.categoryId,
            description: args.description,
        };

        ctx.db.tasks.push(task);

        await CategoryService.increaseTasksCount(ctx, task.categoryId);
        await CategoryService.undone(ctx, { id: task.categoryId });

        return task;
    }

    /**
     * Returns the newest task id
     *
     * @param  {Context} ctx Application Context
     *
     * @returns {number} Newest task id
     */
    const fetchLatestTaskId = (ctx: Context): number => {
        const latestTask = fetchLatestTask(ctx);

        return latestTask?.id ?? 0;
    }

    /**
     * Returns the newest task
     *
     * @param  {Context} ctx Application context
     *
     * @returns {Task} The newest task
     */
    export const fetchLatestTask = (ctx: Context): Task | null => {
        const tasks = ctx.db.tasks;
        const latestId = Math.max(...tasks.map(task => task.id));

        return tasks.find(task => task.id === latestId) ?? null;
    }

    /**
     * Changes task status and marks it as done
     *
     * @param  {Context} ctx Application context
     * @param  {any} args Arguments
     *
     * @returns {Promise<Task | never>} Returns the updated task or throws an error
     */
    export const done = async (ctx: Context, args: any): Promise<Task> => {
        const task = await findTaskOrFail(ctx, args.id);
        await CategoryService.validatePreviousStepsCompletion(ctx, task.categoryId);

        if (task.status !== StatusEnum.DONE) {
            task.status = StatusEnum.DONE;
            await CategoryService.increaseDoneTasksCount(ctx, task.categoryId);
            await CategoryService.doneCategoryIfComplete(ctx, task.categoryId);
        }

        return task;
    }

    /**
     * Changes task status and marks it as done
     *
     * @param  {Context} ctx Application context
     * @param  {any} args Arguments
     *
     * @returns {Promise<Task | never>} Returns the updated task or throws an error
     */
    export const undone = async (ctx: Context, args: any): Promise<Task | never> => {
        const task = await findTaskOrFail(ctx, args.id);
        await CategoryService.validatePreviousStepsCompletion(ctx, task.categoryId);

        if (task.status !== StatusEnum.OPEN) {
            task.status = StatusEnum.OPEN;
            const category = await CategoryService.undone(ctx, { id: task.categoryId });
            await CategoryService.decreaseDoneTasksCount(category);
        }

        return task;
    }

    /**
     * Returns all tasks
     *
     * @param  {Context} ctx Application context
     *
     * @returns {Promise<Task[]>} All tasks
     */
    export const fetchAll = async (ctx: Context): Promise<Task[]> => {
        // @todo Here we can check if the previous steps are incomplete
        //      so we can only return the completed tasks
        //      but for now we show all the tasks
        //      Also we can check which steps are incomplete according to the previous incomplete steps

        return ctx.db.tasks;
    }

    /**
     * Finds a new task
     *
     * @param  {Context} ctx Application Context
     * @param  {number} taskId Task id
     *
     * @returns {Promise<Task | null>} Returns task or null
     */
    export const findTask = async (ctx: Context, taskId: number): Promise<Task | null> => {
        const tasks = ctx.db.tasks;

        return tasks.find(task => task.id === taskId) ?? null;
    }

    /**
     * Finds a new task or throws an error
     *
     * @param  {Context} ctx Application Context
     * @param  {number} taskId Task id
     *
     * @returns {Promise<Task | null>} Returns task if exists, throws error otherwise
     */
    export const findTaskOrFail = async (ctx: Context, taskId: number): Promise<Task | never> => {
        const task = await findTask(ctx, taskId);

        if (!task) {
            throw new Error(SystemMessagesConstants.TASK_NOT_FOUND);
        }

        return task;
    }
}