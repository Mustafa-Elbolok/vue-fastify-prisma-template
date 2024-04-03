/** @format */

import db, { queryHandler } from '../helpers/db';
import IRepository, { AvailableInputs, SearchKey } from '../types/IRepository';
import { User } from '@prisma/client';

export default class UserRepository implements Partial<IRepository<User>> {
    async findByKey({ key, value }: SearchKey<User>): Promise<User | null> {
        return await queryHandler(async () => {
            const where: any = {};
            where[key] = value;
            return await db.user.findFirst({ where });
        });
    }
    async updateById(id: number, data: AvailableInputs<User>): Promise<User | null> {
        return await queryHandler(async () => {
            return await db.user.update({ where: { id }, data });
        });
    }
}
