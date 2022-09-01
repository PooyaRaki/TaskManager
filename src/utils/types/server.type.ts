import { Express } from 'express';
import { IServerLogger } from '@utils/interfaces';

export type ServerType = Express;
export type IServerErrorLogger = Pick<IServerLogger, 'message' | 'block'>;