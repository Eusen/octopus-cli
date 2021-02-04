"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.default = {
    install(program) {
        program
            .command(`start`)
            .description(chalk_1.default.yellowBright(''))
            .action(async (project) => {
        });
    }
};
//# sourceMappingURL=start.js.map