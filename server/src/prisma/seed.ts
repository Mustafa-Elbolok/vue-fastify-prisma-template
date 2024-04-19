/** @format */

const { PrismaClient } = require('@prisma/client');
const { hashSync } = require('bcryptjs');
const data = require('../dummy.test.json');

const prisma = new PrismaClient();
const { categories, products } = data;

async function seed() {
    console.time('Seeding database');
    try {
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
