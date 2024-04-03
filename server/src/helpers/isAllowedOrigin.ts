/** @format */

import origins from '../whiteList.origins.json';

export default function (origin: string) {
    return origins.includes(origin);
}
