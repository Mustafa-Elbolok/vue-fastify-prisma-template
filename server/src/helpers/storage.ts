/** @format */

import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';

const base = './src/public';
export default {
    add: (file: Buffer, type: 'category' | 'product', ext: string) => {
        const filename = `${Date.now()}.${ext}`;
        if (!existsSync(`${base}/storage/${type}/pictures`))
            mkdirSync(`${base}/storage/${type}/pictures`, { recursive: true });

        writeFileSync(`${base}/storage/${type}/pictures/${filename}`, Buffer.from(file));

        return `/storage/${type}/pictures/${filename}`;
    },
    remove: (path: string) => existsSync(base + path) && rmSync(base + path),
};
