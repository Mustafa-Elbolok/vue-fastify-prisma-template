"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, request, reply) {
    var _a, _b, _c;
    if (error.validation) {
        const { instancePath, message, params, keyword } = error.validation[0];
        const details = {
            as: (_a = error.validationContext) !== null && _a !== void 0 ? _a : '',
            valid: params,
            reason: keyword,
        };
        if (instancePath)
            details.field = instancePath.replace('/', '');
        const newError = {
            name: `Invalid ${keyword}`,
            message: instancePath ? instancePath.replace('/', '') + ' ' + message : message,
            details,
        };
        reply.status((_b = error.statusCode) !== null && _b !== void 0 ? _b : 400).send(newError);
    }
    else
        reply.status((_c = error.statusCode) !== null && _c !== void 0 ? _c : 500).send(error);
}
exports.default = default_1;
