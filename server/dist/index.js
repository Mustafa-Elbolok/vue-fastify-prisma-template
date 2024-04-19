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
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const { app, setup } = new app_1.default();
exports.app = app;
function bootstrap(port, host) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            app.listen({ port, host }).then(resolve).catch(reject);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const PORT = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 10000;
            setup(app);
            yield bootstrap(PORT, '0.0.0.0');
            console.log(`🚀 Server is ready at 0.0.0.0:${PORT}`);
        }
        catch (err) {
            console.error('💀 Error starting the node server.\n', err);
        }
    });
}
main();
