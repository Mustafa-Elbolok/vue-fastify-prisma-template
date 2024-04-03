/** @format */

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function queryHandler(query: () => Promise<any>) {
    return query()
        .then(async (queryResults) => {
            await db.$disconnect();
            return queryResults;
        })
        .catch(async (e) => {
            console.error(e);
            await db.$disconnect();
        });
}

export { queryHandler };
export default db;
