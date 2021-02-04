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
            .command(`repair`)
            .description(chalk_1.default.yellowBright('Repair workstation multi support'))
            .action(async () => {
            await workstation_service_1.$workstation.syncConfig();
            workstation_service_1.$workstation.repair();
            console.log(`✨ Successfully~`);
        });
    }
};
//# sourceMappingURL=repair.js.map