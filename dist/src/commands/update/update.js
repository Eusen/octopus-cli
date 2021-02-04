"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const workstation_service_1 = require("../../services/workstation/workstation.service");
exports.default = {
    install(program) {
        program
            .command(`update`)
            .description(chalk_1.default.yellowBright('Updates all workstation dependencies to latest'))
            .action(async () => {
            await workstation_service_1.$workstation.syncConfig();
            await workstation_service_1.$workstation.updateDependencies();
        });
    }
};
//# sourceMappingURL=update.js.map