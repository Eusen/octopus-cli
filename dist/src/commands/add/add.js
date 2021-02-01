"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const workstation_service_1 = require("../../services/workstation/workstation.service");
const common_1 = require("../common");
exports.default = {
    install(program) {
        program
            .command('add [type] [name]')
            .description(chalk_1.default.yellowBright('Adds an extras to your workstation'))
            .action(async (type, name) => {
            const errMsg = await workstation_service_1.$workstation.syncConfig();
            if (errMsg)
                return console.log(errMsg);
            if (!type)
                type = await common_1.getExtraType();
            if (!name)
                name = await common_1.getName(name);
            switch (type) {
                case 'project':
                    return workstation_service_1.$workstation.addProject(name);
            }
        });
    }
};
//# sourceMappingURL=add.js.map