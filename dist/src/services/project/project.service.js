"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$project = exports.ProjectService = void 0;
const commander_1 = __importDefault(require("commander"));
const utils_1 = require("../../utils");
const workstation_service_1 = require("../workstation/workstation.service");
const vue_1 = require("./proxys/vue");
class ProjectService {
    get type() {
        return workstation_service_1.$workstation.config.type;
    }
    serve(project) {
        return utils_1.exec(`${utils_1.fromRoot('node_modules/.bin/vue-cli-service')} serve --project ${project}`);
    }
    build(project) {
        return utils_1.exec(`${utils_1.fromRoot('node_modules/.bin/vue-cli-service')} build --project ${project}`);
    }
    export() {
        workstation_service_1.$workstation.syncConfig();
        commander_1.default.program.option('--project [name]', 'target project').parse();
        const options = commander_1.default.program.opts();
        const projects = workstation_service_1.$workstation.config.projects;
        switch (this.type) {
            case 'vue':
                const vueConfig = projects.filter(p => p.name === options.project)[0] || projects[0];
                if (!vueConfig)
                    return { projectNameError: true };
                return new vue_1.VueProjectServe().export(vueConfig);
        }
    }
}
exports.ProjectService = ProjectService;
exports.$project = new ProjectService();
//# sourceMappingURL=project.service.js.map