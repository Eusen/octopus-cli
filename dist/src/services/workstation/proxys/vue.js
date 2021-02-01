"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueWorkstationCreator = void 0;
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const _base_1 = require("./_base");
const workstation_service_1 = require("../workstation.service");
const utils_1 = require("../../../utils");
class VueWorkstationCreator extends _base_1.WorkstationCreatorBase {
    async create() {
        await utils_1.exec(`vue create ${this.name} --no-git`);
        // vue 项目创建成功，初始化根目录
        utils_1.initRootPath(this.name);
        // 1. 生成 workstation 配置文件
        await workstation_service_1.$workstation.setConfig({
            name: this.name,
            type: 'vue',
            language: fs_1.existsSync(utils_1.fromRoot('tsconfig.json')) ? 'ts' : 'js',
            projects: [
                {
                    name: 'main',
                    root: 'project/main',
                    port: 9621
                }
            ]
        });
        // 生成第一个 main 项目
        console.log(`📄  Generating main project...`);
        await this.initMainProject();
        // 将全局的 public 移动至 main 项目中
        console.log(`📄  Move public to main project...`);
        await this.movePublicFiles();
        // 生成 vue.config.js
        console.log(`📄  Generating vue.config.js...`);
        this.createVueConfigFile();
        // package 中修改相关 scripts
        console.log(`📄  Reset package scripts...`);
        this.resetPackageScripts();
        // 修改 @vue/cli 中的部分内容，以支持多项目结构
        console.log(`📄  Modify '@vue/cli' to support multi project...`);
        this.modifyVueCLI();
        // 本地安装 @octopus/cli
        console.log(`⚙ Installing Octopus CLI service. This might take a while..`);
        await utils_1.exec(`cd ${utils_1.fromRoot()} && npm i -D https://github.com/Eusen/octopus-cli.git`);
    }
    async initMainProject() {
        const srcPath = utils_1.fromRoot('src');
        const mainProjectPath = utils_1.fromRoot('project/main');
        fs_extra_1.moveSync(srcPath, mainProjectPath);
        if (workstation_service_1.$workstation.config.language === 'ts') {
            ['shims-tsx.d.ts', 'shims-vue.d.ts'].forEach(dts => {
                const oldDts = path_1.default.join(mainProjectPath, dts);
                if (fs_1.existsSync(oldDts)) {
                    const newDts = path_1.default.join(srcPath, dts);
                    fs_extra_1.moveSync(oldDts, newDts);
                }
            });
        }
    }
    movePublicFiles() {
        const publicPath = utils_1.fromRoot('public');
        const mainProjectAssetsPath = utils_1.fromRoot('project/main/assets');
        fs_extra_1.moveSync(path_1.default.join(mainProjectAssetsPath, 'logo.png'), path_1.default.join(publicPath, 'logo.png'));
        fs_extra_1.moveSync(publicPath, mainProjectAssetsPath, { overwrite: true });
    }
    createVueConfigFile() {
        const vueConfigPath = utils_1.fromRoot('vue.config.js');
        fs_1.writeFileSync(vueConfigPath, `module.exports = require('@octopus/cli').$project.export();\n`);
    }
    resetPackageScripts() {
        const packageJsonPath = utils_1.fromRoot('package.json');
        const json = require(packageJsonPath);
        json.scripts = {
            serve: 'ops serve',
            build: 'ops build',
        };
        fs_1.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2));
    }
    modifyVueCLI() {
        const rootPath = utils_1.fromRoot('node_modules/@vue/cli-service');
        const optionsPath = path_1.default.join(rootPath, 'lib/options.js');
        let optionsContent = fs_1.readFileSync(optionsPath).toString();
        if (!optionsContent.includes('staticDir')) {
            const index = optionsContent.indexOf('publicPath:');
            optionsContent =
                optionsContent.substring(0, index) +
                    `hmr: joi.boolean(),\n  staticDir: joi.string().allow(''),\n  ` +
                    optionsContent.substring(index, optionsContent.length);
            fs_1.writeFileSync(optionsPath, optionsContent);
        }
        const servePath = path_1.default.join(rootPath, 'lib/commands/serve.js');
        let serveContent = fs_1.readFileSync(servePath).toString();
        if (!serveContent.indexOf('staticDir')) {
            serveContent = serveContent.replace(/api\.resolve\('public'\)/g, `api.resolve(options.staticDir || 'public')`);
            serveContent = serveContent.replace('hot: !isProduction', 'hot: !isProduction && options.hmr');
            fs_1.writeFileSync(servePath, serveContent);
        }
        const appPath = path_1.default.join(rootPath, 'lib/config/app.js');
        let appContent = fs_1.readFileSync(appPath).toString();
        if (!appContent.indexOf('staticDir')) {
            appContent = appContent.replace(/api\.resolve\('public'\)/g, `api.resolve(options.staticDir || 'public')`);
            fs_1.writeFileSync(appPath, appContent);
        }
    }
}
exports.VueWorkstationCreator = VueWorkstationCreator;
//# sourceMappingURL=vue.js.map