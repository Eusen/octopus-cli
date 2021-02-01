"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.default = {
    install(program) {
        program
            .command('info')
            .description(chalk_1.default.yellowBright('Print debugging information about your environment'))
            .action((cmd) => {
            console.log(chalk_1.default.bold('\nEnvironment Info:'));
            require('envinfo').run({
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'Yarn', 'npm'],
                Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
                npmPackages: '/**/{typescript/}',
                npmGlobalPackages: ['@octopus/cli']
            }, {
                showNotFound: true,
                duplicates: true,
                fullTree: true
            }).then(console.log);
        });
    }
};
//# sourceMappingURL=info.js.map