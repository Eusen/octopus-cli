#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const leven_1 = __importDefault(require("leven"));
const package_json_1 = __importDefault(require("../package.json"));
const add_1 = __importDefault(require("./commands/add/add"));
const rename_1 = __importDefault(require("./commands/rename/rename"));
const remove_1 = __importDefault(require("./commands/remove/remove"));
const new_1 = __importDefault(require("./commands/new/new"));
const info_1 = __importDefault(require("./commands/info/info"));
class Main {
    static start() {
        const main = new Main();
        main.setup().then(() => {
            main.run();
        }, err => {
            console.log(chalk_1.default.red(err));
        });
    }
    /**
     * Some `@vue/cli` codes are used for reference
     */
    suggestCommands(unknownCommand = '') {
        const availableCommands = commander_1.program.commands.map(cmd => cmd.name());
        let suggestion = '';
        availableCommands.forEach(cmd => {
            const isBestMatch = leven_1.default(cmd, unknownCommand) < leven_1.default(suggestion || '', unknownCommand);
            if (leven_1.default(cmd, unknownCommand) < 3 && isBestMatch) {
                suggestion = cmd;
            }
        });
        if (suggestion) {
            console.log(`  ` + chalk_1.default.red(`Did you mean ${chalk_1.default.yellow(suggestion)}?`));
        }
        else {
            console.log(`  ` + chalk_1.default.red(`Unknown command ${chalk_1.default.yellow(unknownCommand)}.`));
        }
    }
    setup() {
        return new Promise((resolve, reject) => {
            commander_1.program
                .name('ops')
                .version(`${package_json_1.default.name} ${package_json_1.default.version}`)
                .usage('<command> [options]');
            // install commands
            new_1.default.install(commander_1.program);
            add_1.default.install(commander_1.program);
            rename_1.default.install(commander_1.program);
            remove_1.default.install(commander_1.program);
            info_1.default.install(commander_1.program);
            // output help information on unknown commands
            commander_1.program
                .action(() => {
                const cmd = commander_1.program.args[0];
                if (!cmd)
                    return;
                if (cmd === 'help')
                    return commander_1.program.outputHelp();
                this.suggestCommands(cmd);
            });
            // add some useful info on help
            commander_1.program
                .on('--help', () => {
                console.log();
                console.log(`  Run ${chalk_1.default.cyan(`ops <command> --help`)} for detailed usage of given command.`);
                console.log();
            });
            resolve(true);
        });
    }
    run() {
        commander_1.program.parse();
        if (!process.argv.slice(2).length) {
            commander_1.program.outputHelp();
        }
    }
}
exports.Main = Main;
Main.start();
//# sourceMappingURL=main.js.map