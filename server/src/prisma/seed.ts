/** @format */

import { PrismaClient } from '@prisma/client';
import hasher from '../helpers/hasher.ts';
import data from '../dummy.test.json' with { type: 'json' };

const prisma = new PrismaClient();
const { users, categories, products } = data;

async function seed() {
    console.time('Seeding database');
    try {
        const { admin } = users;
        await prisma.user.upsert({
            where: { email: admin.email },
            update: {},
            create: {
                email: admin.email,
                password: hasher.gen(admin.password),
            },
        });
        console.timeLog('Seeding database', 'Created users successfully');

        for (const category of categories) {
            await prisma.category.upsert({
                where: { id: category.id },
                update: {},
                create: category,
            });
        }
        console.timeLog('Seeding database', 'Created categories successfully');

        for (const product of products) {
            await prisma.product.upsert({
                where: { id: product.id },
                update: {},
                create: product,
            });
        }
        console.timeLog('Seeding database', 'Created products successfully');

        await prisma.$disconnect();
        console.timeLog('Seeding database', 'Seeded database successfully');
    } catch (error) {
        console.timeLog('Seeding database', 'Failed seeding database!');
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
    console.timeEnd('Seeding database');
}

seed();
