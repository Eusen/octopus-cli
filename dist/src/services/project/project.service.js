"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$project = exports.ProjectService = void 0;
const workstation_service_1 = require("../workstation/workstation.service");
const vue_1 = require("./proxys/vue");
const commander_1 = __importDefault(require("commander"));
const utils_1 = require("../../utils");
class ProjectService {
    get type() {
        return workstation_service_1.$workstation.config.type;
    }
    async create(name) {
    }
    serve(project) {
        console.log(this.export());
        console.log(`vue-cli-service serve --project ${project}`);
        return utils_1.exec(`vue-cli-service serve --project ${project}`);
    }
    export() {
        const options = commander_1.default.program.opts();
        const projects = workstation_service_1.$workstation.config.projects;
        console.log(options);
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