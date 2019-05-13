export class ServerError extends Error {
    constructor(message, statusCode = 500) {
        super();

        if (typeof statusCode !== 'number') {
            throw new Error('can not construct ServerError due to arguments error');
        }

        if (!/^5[0-9]{2}$/.test(statusCode.toString())) {
            throw new Error(
                'statusCode in ServerError should be a number in range from 500 to 599',
            );
        }

        Error.captureStackTrace(this, ServerError);
        this.name = 'ServerError';
        this.message = message;
        this.statusCode = statusCode;
    }
}
