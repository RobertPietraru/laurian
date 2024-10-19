import { browser } from '$app/environment';

import pino, { type Logger, type LoggerOptions } from 'pino';
import { get, readable, type Readable } from 'svelte/store';

const pinoLogger: Readable<Logger> = readable<Logger>(pino());

// Exporting the logger value obtained by get() function as to always import the logger file from lib folder.
export const logger = get(pinoLogger);
