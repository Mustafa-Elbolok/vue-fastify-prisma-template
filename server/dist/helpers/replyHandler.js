"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
function resHandler(res, { data, error, pagination, details, status }) {
    let statusCode = 200;
    const result = {};
    if (error)
        result.error = error;
    else {
        result.data = data;
        statusCode = 200;
    }
    if (pagination)
        result.pagination = pagination;
    if (details)
        result.details = details;
    res.status(status !== null && status !== void 0 ? status : statusCode).send(result);
}
exports.default = resHandler;
