import { LogColorEnum, ServerBlockLogEnum } from '@utils/enums';

export interface IServerLogger {
    block: ServerBlockLogEnum,
    message: string,
    color?: LogColorEnum,
}