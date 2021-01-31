"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueWorkstationCreator = void 0;
const _base_1 = require("./_base");
const utils_1 = require("../../../utils");
const workstation_service_1 = require("../workstation.service");
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
class VueWorkstationCreator extends _base_1.WorkstationCreatorBase {
    async create() {
        await utils_1.exec(`vue create ${this.name}`);
        // vue 项目创建成功，初始化根目录
        utils_1.initRootPath(this.name);
        // 1. 生成 workstation 配置文件
        await workstation_service_1.$workstation.setConfig({
            name: this.name,
            type: "vue",
            language: fs_1.existsSync(utils_1.fromRoot('tsconfig.json')) ? 'ts' : 'js',
            projects: {},
        });
        // 2. 生成第一个 main 项目
        await this.initMainProject();
        // 3. 生成 vue.config.js
        await this.createVueConfigFile();
        // 4. 本地安装 @octopus/cli
        await utils_1.exec(`cd ${utils_1.fromRoot()} &&  npm i https://github.com/Eusen/octopus-cli.git`);
    }
    async initMainProject() {
        const srcDir = utils_1.fromRoot('src');
        const mainProjectPath = utils_1.fromRoot('project/main');
        fs_extra_1.moveSync(srcDir, mainProjectPath);
        if (workstation_service_1.$workstation.config.language === 'ts') {
            ['shims-tsx.d.ts', 'shims-vue.d.ts'].forEach(dts => {
                const oldDts = path_1.default.join(mainProjectPath, dts);
                if (fs_1.existsSync(oldDts)) {
                    const newDts = path_1.default.join(srcDir, dts);
                    fs_extra_1.moveSync(oldDts, newDts);
                }
            });
        }
    }
    async createVueConfigFile() {
        fs_1.writeFileSync(utils_1.fromRoot('vue.config.js'), `require('@octopus/cli').process();\n`);
    }
}
exports.VueWorkstationCreator = VueWorkstationCreator;
//# sourceMappingURL=vue.js.map