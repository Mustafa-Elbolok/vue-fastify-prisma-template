/** @format */

import { Result } from '../types/response';
import { FastifyReply } from 'fastify';

export default function resHandler(res: FastifyReply, { data, error, pagination, details, status }: Result) {
    let statusCode = 200;
    const result: Result = {};
    if (error) result.error = error;
    else {
        result.data = data;
        statusCode = 200;
    }

    if (pagination) result.pagination = pagination;
    if (details) result.details = details;
    res.status(status ?? statusCode).send(result);
}
