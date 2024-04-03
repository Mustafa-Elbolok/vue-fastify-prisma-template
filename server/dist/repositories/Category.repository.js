"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importStar(require("../helpers/db"));
const getPicturesArray_1 = __importDefault(require("../helpers/getPicturesArray"));
const storage_1 = __importDefault(require("../helpers/storage"));
class CategoryRepository {
    findAll() {
        return __awaiter(this, arguments, void 0, function* (page = 1, take = 25, query) {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                let where = {};
                if (query === null || query === void 0 ? void 0 : query.level)
                    where.level = query.level;
                if (query === null || query === void 0 ? void 0 : query.parent_id)
                    where.parent_id = query.parent_id;
                if (query === null || query === void 0 ? void 0 : query.name)
                    where.name = { contains: query.name };
                return yield db_1.default.category.findMany({
                    where,
                    take,
                    skip: (page - 1) * take,
                    orderBy: { ['level']: 'desc' },
                    include: {
                        category: { select: { name: true } },
                        subCategories: { select: { _count: true } },
                        products: { select: { id: true } },
                    },
                });
            }));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                return yield db_1.default.category.findUnique({ where: { id } });
            }));
        });
    }
    Add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data;
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                return yield db_1.default.category.create({ data });
            }));
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                return yield db_1.default.category.update({ where: { id }, data });
            }));
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                const categories = yield db_1.default.category.findMany({
                    where: { id },
                    include: {
                        category: { select: { picture: true } },
                        subCategories: {
                            include: {
                                category: { select: { picture: true } },
                                subCategories: {
                                    select: {
                                        picture: true,
                                        products: { select: { picture: true } },
                                    },
                                },
                                products: { select: { picture: true } },
                            },
                        },
                        products: { select: { picture: true } },
                    },
                });
                const pictures = (0, getPicturesArray_1.default)(categories);
                const result = yield db_1.default.category.delete({ where: { id } });
                if (result)
                    for (const picture of pictures)
                        storage_1.default.remove(picture);
                return result;
            }));
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                let where = {};
                if (query === null || query === void 0 ? void 0 : query.level)
                    where.level = query.level;
                if (query === null || query === void 0 ? void 0 : query.parent_id)
                    where.parent_id = query.parent_id;
                if (query === null || query === void 0 ? void 0 : query.name)
                    where.name = { contains: query.name };
                return yield db_1.default.category.count({ where });
            }));
        });
    }
}
exports.default = CategoryRepository;
