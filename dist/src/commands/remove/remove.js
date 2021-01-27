"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const workstation_service_1 = require("../../services/workstation/workstation.service");
exports.default = {
    install(program) {
        program
            .command('remove [type] [name]')
            .description('Removes an extras from your project')
            .action(async (type, name) => {
            if (!type)
                type = await common_1.getExtraType();
            if (!name)
                name = await common_1.getExtraName(name);
            switch (type) {
                case 'project':
                    return workstation_service_1.$workstation.removeProject(name);
            }
        });
    }
};
//# sourceMappingURL=remove.js.map