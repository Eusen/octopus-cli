"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.default = {
    install(program) {
        program
            .command('info')
            .description('print debugging information about your environment')
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