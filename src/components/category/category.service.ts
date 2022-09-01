import { Context } from '@api/context';
import { Category } from '@api/db';
import { SystemMessagesConstants } from '@utils/constants/message.const';
import { StatusEnum } from '@utils/enums/status.enum';

export namespace CategoryService {

    /**
     * Creates a new category
     *
     * @param  {Context} ctx Application context
     * @param  {any} args Arguments
     *
     * @returns {Promise<Category>} The newly created category
     */
    export const create = async (ctx: Context, args: any): Promise<Category> => {
        const category: Category = {
            id: await fetchLatestCategoryId(ctx) + 1,
            step: await fetchLatestCategoryStep(ctx) + 1,

            taskCount: 0,
            title: args.title,
            tasksCompletedCount: 0,
            status: StatusEnum.DONE,
            description: args.description,
        };

        ctx.db.categories.push(category);

        return category;
    }

    /**
     * Returns the newest category id
     *
     * @param  {Context} ctx Application Context
     *
     * @returns {Promise<number>} Newest category id
     */
    const fetchLatestCategoryId = async (ctx: Context): Promise<number> => {
        const latestCategory = await fetchLatestCategory(ctx);

        return latestCategory?.id ?? 0;
    }

    /**
     * Returns the newest category step
     *
     * @param  {Context} ctx Application Context
     *
     * @returns {Promise<number>} Newest category id
     */
    const fetchLatestCategoryStep = async (ctx: Context): Promise<number> => {
        const latestCategory = await fetchLatestCategory(ctx);

        return latestCategory?.step ?? 0;
    }

    /**
     * Returns the newest category
     *
     * @param  {Context} ctx Application context
     *
     * @returns {Category} The newest category
     */
    export const fetchLatestCategory = async (ctx: Context): Promise<Category | null> => {
        const categories = ctx.db.categories;
        const latestId = Math.max(...categories.map(category => category.id));

        return await findCategory(ctx, latestId) ?? null;
    }

    /**
     * Finds a category
     *
     * @param  {Context} ctx Application Context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<Category | null>} Returns category or null
     */
    export const findCategory = async (ctx: Context, categoryId: number): Promise<Category | null> => {
        return ctx.db.categories.find(category => category.id === categoryId) ?? null;
    }

    export const remove = async (ctx: Context, args: any): Promise<Category> => {
        // @todo Here we remove the category and update the previous node step accordingly

        return ctx.db.categories[0]; // @todo Here we remove the first category to prevent typescript errors until this method is implemented
    }

    /**
     * Changes category status and marks it as done
     *
     * @param  {Context} ctx Application context
     * @param  {any} args Arguments
     *
     * @returns {Promise<Category | never>} Returns the updated category or throws an error
     */
    export const done = async (ctx: Context, args: any): Promise<Category | never> => {
        const category = await findCategoryOrFail(ctx, args.id);

        category.status = StatusEnum.DONE;

        return category;
    }

    /**
     * Changes category status and marks it as undone
     *
     * @param  {Context} ctx Application context
     * @param  {any} args Arguments
     *
     * @returns {Promise<Category | never>} Returns the updated category or throws an error
     */
    export const undone = async (ctx: Context, args: any): Promise<Category | never> => {
        const category = await findCategoryOrFail(ctx, args.id);
        category.status = StatusEnum.OPEN;

        return category;
    }

    /**
     * Finds a new category or throws an error
     *
     * @param  {Context} ctx Application Context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<Category | null>} Returns category if exists, throws error otherwise
     */
    export const findCategoryOrFail = async (ctx: Context, categoryId: number): Promise<Category> => {
        const category = await findCategory(ctx, categoryId);

        if (!category) {
            throw new Error(SystemMessagesConstants.CATEGORY_NOT_FOUND);
        }

        return category;
    }

    /**
     * Returns all Categories
     *
     * @param  {Context} ctx Application context
     *
     * @returns {Promise<Category[]>} All categories
     */
    export const fetchAll = async (ctx: Context): Promise<Category[]> => {
        return ctx.db.categories;
    }

    /**
     * Checks if all the task in the category are done marks the category itself as done
     *
     * @param  {Context} ctx Application context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<Category>} Category object
     */
    export const doneCategoryIfComplete = async (ctx: Context, categoryId: number): Promise<Category> => {
        const category = await findCategoryOrFail(ctx, categoryId);
        if (await CategoryService.isCategoryComplete(category)) {
            category.status = StatusEnum.DONE;
        }

        return category;
    }

    /**
     * Here we check whether a category has all of its tasks done
     *
     * @param  {Category} category Category object
     *
     * @returns {Promise<boolean | never>} Returns true if all tasks are done otherwise false.
     */
    export const isCategoryComplete = async (category: Category): Promise<boolean> => {
        return category.taskCount === category.tasksCompletedCount;
    }

    /**
     * Increments the number of done tasks in this category
     *
     * @param  {Context} ctx Application context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<Category>} Category object
     */
    export const increaseDoneTasksCount = async (ctx: Context, categoryId: number): Promise<Category> => {
        const category = await findCategoryOrFail(ctx, categoryId);

        category.tasksCompletedCount = category.tasksCompletedCount + 1;

        return category;
    }

    /**
     * Decrements the number of done tasks in this category
     *
     * @param  {Category} category Category object
     *
     * @returns {Promise<Category>} Returns true if all tasks are done otherwise false.
     */
    export const decreaseDoneTasksCount = async (category: Category): Promise<void> => {
        category.tasksCompletedCount = category.tasksCompletedCount - 1;
    }

    /**
     * Increments the number of tasks in this category
     *
     * @param  {Context} ctx Application context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<Category>}
     */
    export const increaseTasksCount = async (ctx: Context, categoryId: number): Promise<Category> => {
        const category = await findCategoryOrFail(ctx, categoryId);

        category.taskCount = category.taskCount + 1;

        return category;
    }

    /**
     * Decrements the number of tasks in this category
     *
     * @param  {Context} ctx Application context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<Category>}
     */
    export const decreaseTasksCount = async (ctx: Context, categoryId: number): Promise<Category> => {
        const category = await findCategoryOrFail(ctx, categoryId);

        category.taskCount = category.taskCount - 1;

        return category;
    }

    /**
     * Checks whether the category exists or not
     *
     * @param  {Context} ctx Application context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<void>}
     */
    export const validateCategory = async (ctx: Context, categoryId: number): Promise<void> => {
        const category = await findCategory(ctx, categoryId);

        if (!category) {
            throw new Error(SystemMessagesConstants.CATEGORY_NOT_FOUND);
        }
    }

    /**
     * Validates if the previous steps are completed
     *
     * @param  {Context} ctx Application context
     * @param  {number} categoryId CategoryId
     *
     * @returns {Promise<void>} If the last step is not completed throws an error
     */
    export const validatePreviousStepsCompletion = async (
        ctx: Context,
        categoryId: number,
    ): Promise<void> => {
        if (await isTherePreviousOpens(ctx, categoryId)) {
            throw new Error(
                SystemMessagesConstants.PREVIOUS_STEPS_INCOMPLETE,
            );
        }
    }

    /**
     * Checks if there is any open category before the current one
     *
     * @param  {Context} ctx Application context
     * @param  {number} categoryId Category id
     *
     * @returns {Promise<boolean>}
     */
    export const isTherePreviousOpens = async (ctx: Context, categoryId: number): Promise<boolean> => {
        const currentCategory = await findCategoryOrFail(ctx, categoryId);
        const categories = ctx.db.categories;

        return categories
            .find(category =>
                category.step < currentCategory.step &&
                category.status === StatusEnum.OPEN
            ) !== undefined;
    }
}