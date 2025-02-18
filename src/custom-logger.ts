import { logger } from './winston-logger';

export class CustomLogger {
    log(message: string, details?: any) {
        logger.info(message, details);
    }
    error(message: string, trace?: string) {
        try {
            const traceData = JSON.parse(trace || "{}");

            logger.error(message, {
                labels: { statusCode: traceData.statusCode },
                status: traceData.status,
                timestamp: traceData.timestamp,
                path: traceData.path,
                error: traceData.data?.join(", ") || "Unknown error",
            });
        } catch (err) {
            logger.error(message, { trace });
        }
    }
    warn(message: string) {
        logger.warn(message);
    }
    debug(message: string, details?: any) {
        logger.debug(message, details);
    }
    verbose(message: string) {
        logger.verbose(message);
    }
}
