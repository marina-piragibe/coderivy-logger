import { logger } from './winston-logger';

export class CustomLogger {
    log(message: string, details?: any) {
        logger.info(message, { details, labels: { level: "info" } });
    }
    error(message: string, trace?: string) {
        try {
            const traceData = JSON.parse(trace || "{}");

            logger.error(message, {
                labels: { level: "error", statusCode: traceData.statusCode },
                statusCode: traceData.statusCode,
                status: traceData.status,
                timestamp: traceData.timestamp,
                path: traceData.path,
                error: traceData.data?.join(", ") || "Unknown error",
            });
        } catch (err) {
            logger.error(message, { trace, labels: { level: "error" } });
        }
    }
    warn(message: string, details?: any) {
        logger.warn(message, { details, labels: { level: "warn" } });
    }
    debug(message: string, details?: any) {
        logger.debug(message, { details, labels: { level: "debug" } });
    }
    verbose(message: string, details?: any) {
        logger.verbose(message, { details, labels: { level: "verbose" } });
    }
}
