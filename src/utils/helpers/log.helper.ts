import { LogColorEnum } from '@utils/enums';
import { IServerErrorLogger } from '@utils/types';
import { IServerLogger } from '@utils/interfaces';

/**
 * Creates a server console log
 * 
 * @param  {IServerLogger} log Log object
 *
 * @returns {void}
 */
export const ServerLogger = (log: IServerLogger): void => {
    ConsoleLogColorful(
        log.color ?? LogColorEnum.FgYellow,
        `[${log.block}]: ${LogColorEnum.FgGreen} [${new Date()}] ${log.message}`,
    );
}

/**
 * Creates an error-like console log
 *
 * @param  {IServerErrorLogger} log Log object
 *
 * @returns {void}
 */
export const ErrorLogger = (log: IServerErrorLogger): void => {
    ConsoleLogColorful(
        LogColorEnum.FgRed,
        `[${log.block}]: ${log.message}`,
    );
}

/**
 * Creates a colorful console log
 *
 * @param  {LogColorEnum} color The text or background color
 * @param  {string} message The message to be logged
 *
 * @returns {void}
 */
export const ConsoleLogColorful = (color: LogColorEnum, message: string): void => {
    console.log(color, message);
}