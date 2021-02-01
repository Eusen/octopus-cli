"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const workstation_service_1 = require("../../services/workstation/workstation.service");
exports.default = {
    install(program) {
        program
            .command('rename [type] [name]')
            .description('Removes an extras from your workstation')
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