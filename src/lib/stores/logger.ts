import { browser } from '$app/environment';
import pino, { type Logger, type LoggerOptions } from 'pino';
import { get, readable, type Readable } from 'svelte/store';

const pinoOptions: LoggerOptions = {
    level: 'debug',
    hooks: {
        logMethod(inputArgs, method) {
            for (const arg of inputArgs) {
                inputArgs[inputArgs.indexOf(arg)] = (arg);
            }
            inputArgs[0] = `[${new Date().toISOString()}] ${inputArgs.join(' || ')}`;
            return method.apply(this, inputArgs);
        }
    }
};

const pinoLogger: Readable<Logger> = readable<Logger>(pino(pinoOptions));

// Exporting the logger value obtained by get() function as to always import the logger file from lib folder.
export const logger = get(pinoLogger);