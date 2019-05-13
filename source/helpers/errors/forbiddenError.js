export class ForbiddenError extends Error {
    constructor(message, statusCode = 403) {
        super();

        if (typeof statusCode !== 'number') {
            throw new Error('can not construct ForbiddenError due to arguments error');
        }

        if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode.toString())) {
            throw new Error(
                'statusCode in ForbiddenError should be a number in range from 100 to 599',
            );
        }

        Error.captureStackTrace(this, ForbiddenError);
        this.name = 'ForbiddenError';
        this.message = message;
        this.statusCode = statusCode;
    }
}
