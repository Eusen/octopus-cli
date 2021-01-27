"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("../common");
const workstation_service_1 = require("../../services/workstation/workstation.service");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.default = {
    install(program) {
        program
            .command('new [name]')
            .description('create an octopus workstation')
            .option('-t, --type <type>', 'Specifies the type of workstation')
            .action(async (name, options) => {
            if (!name)
                name = await common_1.getName('workstation');
            if (!options.type)
                options.type = await common_1.getWorkstationType();
            if (!workstation_service_1.WORKSTATION_TYPES_MAP[options.type]) {
                return console.log(chalk_1.default.bold(chalk_1.default.red('You can only choose one of the following three frameworks:\n')) +
                    chalk_1.default.yellowBright('vue\n') +
                    chalk_1.default.yellowBright('angular\n') +
                    chalk_1.default.yellowBright('react'));
            }
            workstation_service_1.$workstation.create(name, options.type);
        });
    }
};
//# sourceMappingURL=new.js.map