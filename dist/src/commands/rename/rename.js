"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const common_1 = require("../common");
const workstation_service_1 = require("../../services/workstation/workstation.service");
exports.default = {
    install(program) {
        program
            .command('rename [type] [name]')
            .description(chalk_1.default.yellowBright('Renames an extras from your workstation'))
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
                    return workstation_service_1.$workstation.renameProject(name);
            }
        });
    }
};
//# sourceMappingURL=rename.js.map