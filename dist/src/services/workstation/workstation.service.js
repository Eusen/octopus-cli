"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$workstation = exports.WorkstationService = exports.WORKSTATION_TYPES_MAP = void 0;
const _path_1 = require("../../utils/_path");
const fs_1 = require("fs");
exports.WORKSTATION_TYPES_MAP = {
    vue: true,
    angular: true,
    react: true,
};
class WorkstationService {
    constructor() {
        this.configPath = _path_1.formRoot('workstation.config.json');
        this.config = {
            name: _path_1.getWorkstationName(),
            type: '',
            projects: {},
        };
        this.syncConfig();
    }
    syncConfig() {
        if (fs_1.existsSync(this.configPath)) {
            this.config = require(this.configPath);
        }
        fs_1.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    }
    init(name) {
    }
    create(type) {
    }
    addProject(name) {
    }
    renameProject(name) {
    }
    removeProject(name) {
    }
}
exports.WorkstationService = WorkstationService;
exports.$workstation = new WorkstationService();
//# sourceMappingURL=workstation.service.js.map