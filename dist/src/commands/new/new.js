"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    install(program) {
        program
            .command('new <name>', 'Adds an extras to your project')
            .action((name) => {
            console.log('add', name);
        });
    }
};
//# sourceMappingURL=new.js.map