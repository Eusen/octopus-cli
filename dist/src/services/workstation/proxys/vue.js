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
        utils_1.cls();
        utils_1.initRootPath(this.name);
        console.log(`🔨  Generating workstation.json...`);
        await workstation_service_1.$workstation.setConfig({
            name: this.name,
            type: 'vue',
            language: fs_1.existsSync(utils_1.fromRoot('tsconfig.json')) ? 'ts' : 'js',
            projects: []
        });
        console.log(`🔥  Removing init files...`);
        this.removeInitFiles();
        console.log(`🔨  Generating vue.config.js...`);
        this.createVueConfigFile();
        console.log(`📝  Reset package scripts...`);
        this.resetPackageScripts();
        console.log(`📝  Appending project dir to tsconfig.json...`);
        this.appendProjectToTsConfigIncludes();
        console.log(`🔧  Modify '@vue/cli' to support multi project...`);
        this.modifyVueCLI();
        console.log(`🚀  Installing Octopus CLI service. This might take a while..`);
        await utils_1.exec([
            `cd ${utils_1.fromRoot()}`,
            'npm i -D https://github.com/Eusen/octopus-cli.git https://github.com/Eusen/octopus-cli-templates.git',
        ].join(' && '));
        // 创建 main 项目
        await workstation_service_1.$workstation.addProject('main');
    }
    removeInitFiles() {
        const srcPath = utils_1.fromRoot('src');
        const publicPath = utils_1.fromRoot('public');
        fs_extra_1.removeSync(srcPath);
        fs_extra_1.removeSync(publicPath);
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
    appendProjectToTsConfigIncludes() {
        const tsconfigPath = utils_1.fromRoot('tsconfig.json');
        const tsconfig = require(tsconfigPath);
        tsconfig.include.push('projects/**/*.ts');
        tsconfig.include.push('projects/**/*.tsx');
        tsconfig.include.push('projects/**/*.vue');
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