"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(path) {
    switch (path.split(".").at(-1)) {
        case 'js': return 'application/javascript';
        case 'css': return 'text/css';
        case 'png': return 'image/png';
        case 'jpeg': return 'image/jpeg';
        case 'svg': return 'image/svg+xml';
        case 'html': return 'text/html';
        default: return 'text/plain';
    }
}
exports.default = default_1;
