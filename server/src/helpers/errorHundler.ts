/** @format */

import { Reply } from '../app';
import { SchemaErrorDetails } from '../types/schemaTypes';
import { FastifyError } from 'fastify';

export default function (error: FastifyError, request: any, reply: Reply) {
    if (error.validation) {
        const { instancePath, message, params, keyword } = error.validation[0];
        const details: SchemaErrorDetails = {
            as: error.validationContext ?? '',
            valid: params,
            reason: keyword,
        };
        if (instancePath) details.field = instancePath.replace('/', '');

        const newError: any = {
            name: `Invalid ${keyword}`,
            message: instancePath ? instancePath.replace('/', '') + ' ' + message : message,
            details,
        };
        reply.status(error.statusCode ?? 400).send(newError);
    } else reply.status(error.statusCode ?? 500).send(error);
}
