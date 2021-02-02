"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("../../utils");
const common_1 = require("../common");
const workstation_service_1 = require("../../services/workstation/workstation.service");
exports.default = {
    install(program) {
        program
            .command('new [name]')
            .description(chalk_1.default.yellowBright('Creates a workstation'))
            .option('-t, --type <type>', 'Specifies the type of workstation')
            .action(async (name, options) => {
            if (!name)
                name = await common_1.getName('workstation');
            if (!options.type)
                options.type = await common_1.getWorkstationType();
            if (!workstation_service_1.WORKSTATION_TYPES_MAP[options.type]) {
                utils_1.throwError('You can only choose one of the following three frameworks:');
                Object.keys(workstation_service_1.WORKSTATION_TYPES_MAP).forEach(type => console.log(chalk_1.default.yellowBright(type)));
                return process.exit(0);
            }
            await workstation_service_1.$workstation.create(name, options.type);
        });
    }
};
//# sourceMappingURL=new.js.map