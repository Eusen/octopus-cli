"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workstation_service_1 = require("../../services/workstation/workstation.service");
const common_1 = require("../common");
exports.default = {
    install(program) {
        program
            .command('add [type] [name]')
            .description('Adds an extras to your workstation')
            .action(async (type, name) => {
            if (!type)
                type = await common_1.getExtraType();
            if (!name)
                name = await common_1.getExtraName(name);
            switch (type) {
                case 'project':
                    return workstation_service_1.$workstation.addProject(name);
            }
        });
    }
};
//# sourceMappingURL=add.js.map