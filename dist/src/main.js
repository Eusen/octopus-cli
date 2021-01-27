"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const tslib_1 = require("tslib");
const commander_1 = require("commander");
const package_json_1 = tslib_1.__importDefault(require("../package.json"));
const add_1 = tslib_1.__importDefault(require("./commands/add/add"));
const rename_1 = tslib_1.__importDefault(require("./commands/rename/rename"));
const remove_1 = tslib_1.__importDefault(require("./commands/remove/remove"));
class Main {
    setup() {
        commander_1.program
            .version(`${package_json_1.default.name} ${package_json_1.default.version}`)
            .usage('<command> [options]');
        add_1.default.install(commander_1.program);
        rename_1.default.install(commander_1.program);
        remove_1.default.install(commander_1.program);
        return this;
    }
    run() {
        commander_1.program.parse();
    }
}
exports.Main = Main;
new Main().setup().run();
//# sourceMappingURL=main.js.map