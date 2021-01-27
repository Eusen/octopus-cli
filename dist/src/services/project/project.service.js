"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$project = exports.ProjectService = void 0;
const vue_1 = require("./proxys/vue");
class ProjectService {
    getDefaultConfig(type, config) {
        switch (type) {
            case 'vue':
                return vue_1.createVueProjectConfig(config);
        }
        return {};
    }
}
exports.ProjectService = ProjectService;
exports.$project = new ProjectService();
//# sourceMappingURL=project.service.js.map