"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const base = './src/public';
exports.default = {
    add: (file, type, ext) => {
        const filename = `${Date.now()}.${ext}`;
        if (!(0, fs_1.existsSync)(`${base}/storage/${type}/pictures`))
            (0, fs_1.mkdirSync)(`${base}/storage/${type}/pictures`, { recursive: true });
        (0, fs_1.writeFileSync)(`${base}/storage/${type}/pictures/${filename}`, Buffer.from(file));
        return `/storage/${type}/pictures/${filename}`;
    },
    remove: (path) => (0, fs_1.existsSync)(base + path) && (0, fs_1.rmSync)(base + path),
};
