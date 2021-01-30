"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueWorkstationCreator = void 0;
const _base_1 = require("./_base");
const utils_1 = require("../../../utils");
const workstation_service_1 = require("../workstation.service");
const project_service_1 = require("../../project/project.service");
class VueWorkstationCreator extends _base_1.WorkstationCreatorBase {
    async create() {
        await utils_1.exec(`vue create ${this.name}`);
        // vue 项目创建成功，初始化根目录
        utils_1.initRootPath(this.name);
        // 1. 生成 workstation 配置文件
        await workstation_service_1.$workstation.setConfig({
            name: this.name,
            type: "vue",
            projects: {},
        });
        // 2. 删除一些初始文件
        await this.removeVueInitFiles();
        // 3. 生成第一个 main 项目
        await project_service_1.$project.create(this.name);
        // 4. 本地安装 @octopus/cli
        await utils_1.exec('npm i https://github.com/Eusen/octopus-cli.git');
        // 5. 生成 vue.config.js
        await this.createVueConfigFile();
    }
    async removeVueInitFiles() {
    }
    async createVueConfigFile() {
    }
}
exports.VueWorkstationCreator = VueWorkstationCreator;
//# sourceMappingURL=vue.js.map