/** @format */

import bcrypt from 'bcryptjs';
const { compareSync, hashSync } = bcrypt;

export default {
    gen: (value: string) => hashSync(value, 9),
    test: (value: string, hash: string) => compareSync(value, hash),
};
