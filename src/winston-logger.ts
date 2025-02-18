import { createLogger, format, transports } from 'winston';
import LokiTransport from 'winston-loki';

export const logger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    transports: [
        new LokiTransport({
            host: process.env.LOKI_URL || "",
            labels: { service: process.env.SERVICE_NAME },
        }),
        new transports.Console({
            format: format.cli()
        }),
    ],
});

export function createClassLogger(className: string) {
    return logger.child({ class: className });
}