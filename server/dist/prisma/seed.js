/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PrismaClient } = require('@prisma/client');
const { hashSync } = require('bcryptjs');
const data = require('../dummy.test.json');
const prisma = new PrismaClient();
const { categories, products } = data;
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.time('Seeding database');
        try {
            for (const category of categories) {
                yield prisma.category.upsert({
                    where: { id: category.id },
                    update: {},
                    create: category,
                });
            }
            console.timeLog('Seeding database', 'Created categories successfully');
            for (const product of products) {
                yield prisma.product.upsert({
                    where: { id: product.id },
                    update: {},
                    create: product,
                });
            }
            console.timeLog('Seeding database', 'Created products successfully');
            yield prisma.$disconnect();
            console.timeLog('Seeding database', 'Seeded database successfully');
        }
        catch (error) {
            console.timeLog('Seeding database', 'Failed seeding database!');
            console.error(error);
            yield prisma.$disconnect();
            process.exit(1);
        }
        console.timeEnd('Seeding database');
    });
}
seed();
