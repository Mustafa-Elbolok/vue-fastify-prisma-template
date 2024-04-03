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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importStar(require("../helpers/db"));
class ProductRepository {
    findAll() {
        return __awaiter(this, arguments, void 0, function* (page = 1, take = 25, query) {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                let where = {};
                if (query === null || query === void 0 ? void 0 : query.category_id)
                    where.category_id = query.category_id;
                if (query === null || query === void 0 ? void 0 : query.name)
                    where.name = { contains: query.name };
                return yield db_1.default.product.findMany({
                    where,
                    take,
                    skip: (page - 1) * take,
                    orderBy: { ['created_at']: 'desc' },
                    include: {
                        category: { select: { name: true } },
                    },
                });
            }));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                return yield db_1.default.product.findUnique({ where: { id } });
            }));
        });
    }
    Add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data;
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                return yield db_1.default.product.create({ data });
            }));
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                return yield db_1.default.product.update({ where: { id }, data });
            }));
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                return yield db_1.default.product.delete({ where: { id } });
            }));
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.queryHandler)(() => __awaiter(this, void 0, void 0, function* () {
                let where = {};
                if (query === null || query === void 0 ? void 0 : query.category_id)
                    where.category_id = query.category_id;
                if (query === null || query === void 0 ? void 0 : query.name)
                    where.name = { contains: query.name };
                return yield db_1.default.product.count({ where });
            }));
        });
    }
}
exports.default = ProductRepository;
