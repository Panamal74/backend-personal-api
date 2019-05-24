export class NotFoundError extends Error {
    constructor(message, statusCode = 404) {
        super();

        if (typeof statusCode !== 'number') {
            throw new Error('Can not construct NotFoundError due to arguments error');
        }

        if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode.toString())) {
            throw new Error(
                'statusCode in NotFoundError should be a number in range from 100 to 599',
            );
        }

        Error.captureStackTrace(this, NotFoundError);
        this.name = 'NotFoundError';
        this.message = message;
        this.statusCode = statusCode;
    }
}
