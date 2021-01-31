"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const workstation_service_1 = require("../../services/workstation/workstation.service");
const project_service_1 = require("../../services/project/project.service");
exports.default = {
    install(program) {
        program
            .command('serve [project]')
            .description('Removes an extras from your workstation')
            .action(async (project) => {
            const resp = await workstation_service_1.$workstation.syncConfig();
            if (!resp)
                return;
            if (!project)
                project = await common_1.selectProject();
            return project_service_1.$project.serve(project);
        });
    }
};
//# sourceMappingURL=serve.js.map