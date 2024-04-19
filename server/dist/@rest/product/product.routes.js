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
const product_schema_1 = __importDefault(require("./product.schema"));
const product_service_1 = __importDefault(require("./product.service"));
const productService = new product_service_1.default();
function productsRouter(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.decorateRequest('productsRouter', '');
        app.get('/', { schema: product_schema_1.default.getAllProducts }, productService.getAllProducts);
        app.get('/:id', { schema: product_schema_1.default.getProductById }, productService.getProductById);
        app.register(productsActionsRouter);
    });
}
function productsActionsRouter(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.decorateRequest('productsActionsRouter', '');
        app.post('/', { schema: product_schema_1.default.createProduct }, productService.createProduct);
        app.put('/:id', { schema: product_schema_1.default.updateProduct }, productService.updateProduct);
        app.delete('/:id', { schema: product_schema_1.default.removeProduct }, productService.removeProduct);
    });
}
exports.default = productsRouter;
