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
            .command('rename [type] [old-name] [new-name]')
            .description(chalk_1.default.yellowBright('Rename an extras from your workstation'))
            .action(async (type, oldName, newName) => {
            await workstation_service_1.$workstation.syncConfig();
            if (!type)
                type = await common_1.getExtraType();
            if (!oldName)
                oldName = await common_1.selectProject();
            if (!newName)
                newName = await common_1.getName(newName, true);
            switch (type) {
                case 'project':
                    return workstation_service_1.$workstation.renameProject(oldName, newName);
            }
        });
    }
};
//# sourceMappingURL=rename.js.map