"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cls = exports.getTitle = exports.throwError = exports.exec = void 0;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const readline = __importStar(require("readline"));
const package_json_1 = __importDefault(require("../../package.json"));
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
function getTitle() {
    return chalk_1.default.blueBright(`Octopus CLI v${package_json_1.default.version}`);
}
exports.getTitle = getTitle;
function cls(title = getTitle()) {
    if (process.stdout.isTTY) {
        const blank = '\n'.repeat(process.stdout.rows);
        console.log(blank);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        if (title)
            console.log(title);
    }
}
exports.cls = cls;
//# sourceMappingURL=_exec.js.map