"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$project = exports.ProjectService = void 0;
const workstation_service_1 = require("../workstation/workstation.service");
class ProjectService {
    get type() {
        return workstation_service_1.$workstation.config.type;
    }
    async create(name) {
    }
}
exports.ProjectService = ProjectService;
exports.$project = new ProjectService();
//# sourceMappingURL=project.service.js.map