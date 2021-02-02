"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = exports.exec = void 0;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
function exec(cmd) {
    return new Promise((resolve, reject) => {
        const _process = child_process_1.spawn(cmd, {
            shell: true,
            stdio: 'inherit',
            cwd: process.cwd(),
        });
        _process.addListener('error', (err) => reject(err));
        _process.addListener('exit', (code, signal) => resolve({ code, signal }));
    });
}
exports.exec = exec;
function throwError(message, exit = false) {
    console.log(chalk_1.default.bold(chalk_1.default.red(message)));
    exit && process.exit(0);
}
exports.throwError = throwError;
//# sourceMappingURL=_exec.js.map