"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_1 = __importDefault(require("../../hooks/authorization"));
const category_schema_1 = __importDefault(require("./category.schema"));
const category_service_1 = __importDefault(require("./category.service"));
const categoryService = new category_service_1.default();
function categoriesRouter(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.decorateRequest('categoriesRouter', '');
        app.get('/', { schema: category_schema_1.default.getAllCategories }, categoryService.getAllCategories);
        app.get('/:id', { schema: category_schema_1.default.getCategoryById }, categoryService.getCategoryById);
        app.register(categoriesActionsRouter);
    });
}
function categoriesActionsRouter(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.decorateRequest('categoriesActionsRouter', '');
        const authorizationHook = new authorization_1.default();
        app.addHook('onRequest', authorizationHook.verify);
        app.post('/', { schema: category_schema_1.default.createCategory }, categoryService.createCategory);
        app.put('/:id', { schema: category_schema_1.default.updateCategory }, categoryService.updateCategory);
        app.delete('/:id', {
            schema: category_schema_1.default.removeCategory,
            onRequest: authorizationHook.confirm,
        }, categoryService.removeCategory);
    });
}
exports.default = categoriesRouter;
