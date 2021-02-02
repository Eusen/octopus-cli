"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$workstation = exports.WorkstationService = exports.WORKSTATION_LANGUAGES_MAP = exports.WORKSTATION_TYPES_MAP = void 0;
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("../../utils");
const vue_1 = require("./proxys/vue");
exports.WORKSTATION_TYPES_MAP = {
    vue: true,
    angular: true,
    react: true,
};
exports.WORKSTATION_LANGUAGES_MAP = {
    js: true,
    ts: true,
};
class WorkstationService {
    constructor() {
        this.ext = ['ts', 'tsx', 'js', 'jsx', 'vue'];
        this.configPath = '';
    }
    setConfig(config) {
        this.config = config;
        return this.syncConfig();
    }
    syncConfig() {
        if (!utils_1.getRootPath()) {
            return utils_1.throwError('The ops cli requires to be run in an Octopus workstation, ' +
                'but a workstation definition could not be found.', true);
        }
        if (!this.configPath) {
            this.configPath = utils_1.fromRoot('workstation.json');
        }
        if (!this.config && fs_1.existsSync(this.configPath)) {
            this.config = require(this.configPath);
        }
        fs_1.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    }
    create(name, type) {
        switch (type) {
            case 'vue':
                return new vue_1.VueWorkstationCreator(name).create();
        }
        return Promise.resolve();
    }
    checkTemplatesPackage() {
        if (!fs_1.existsSync(utils_1.fromRoot('node_modules/@octopus/cli-templates'))) {
            return utils_1.exec('npm i -D https://github.com/Eusen/octopus-cli-templates.git');
        }
        return Promise.resolve();
    }
    async modifyProjectAlias(rootPath, oldAlias, newAlias) {
        if (fs_1.statSync(rootPath).isDirectory()) {
            const subDirs = fs_1.readdirSync(rootPath);
            for await (const dir of subDirs) {
                await this.modifyProjectAlias(path_1.default.join(rootPath, dir), oldAlias, newAlias);
            }
        }
        else {
            if (!this.ext.includes(path_1.default.basename(rootPath)))
                return;
            const content = fs_1.readFileSync(rootPath).toString();
            fs_1.writeFileSync(rootPath, content.replace(new RegExp(oldAlias, 'g'), newAlias));
        }
    }
    async addProject(name) {
        console.log(`✨ Creating ${name} project...`);
        const noSameProjectName = this.config.projects.every(p => p.name !== name);
        if (!noSameProjectName)
            return utils_1.throwError('A project with the same name already exists.', true);
        const alias = `@${name}/`;
        if (this.config.language === 'ts') {
            console.log(`📝 Appending project alias to tsconfig.json...`);
            const tsconfigPath = utils_1.fromRoot('tsconfig.json');
            const tsconfig = require(tsconfigPath);
            tsconfig.compilerOptions.paths[`${alias}*`] = [`projects/${name}/*`];
            fs_1.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        }
        console.log(`📝 Appending project info to workstation.json...`);
        const root = `projects/${name}`;
        this.config.projects.push({
            name,
            root,
            port: 9621 + this.config.projects.length,
        });
        this.syncConfig();
        console.log(`👷 Checking whether '@octopus/cli-templates' installed or not...`);
        await this.checkTemplatesPackage();
        console.log(`📝 Copying project template file to workstation...`);
        [
            `templates/project/${this.config.type}/common`,
            `templates/project/${this.config.type}/${this.config.language}`,
        ].forEach(dir => {
            fs_extra_1.copySync(utils_1.fromCLIRoot(dir), utils_1.fromRoot(root), { recursive: true, preserveTimestamps: true });
        });
        console.log(`📝 Modifying project alias...`);
        await this.modifyProjectAlias(utils_1.fromRoot(root), '@/', alias);
        console.log(`✨ Successfully created project ${chalk_1.default.yellow(name)}.`);
        console.log(`✨ Get started with the following commands:`);
        console.log();
        console.log(` $ ${chalk_1.default.blueBright(`cd ${this.config.name}`)}`);
        console.log(` $ ${chalk_1.default.blueBright(`npm run serve`)}`);
        console.log();
    }
    renameProject(name) {
        const noSameProjectName = this.config.projects.every(p => p.name !== name);
        if (noSameProjectName)
            return utils_1.throwError('Project not found', true);
        // tsconfig.json 修改 项目别名
        // workstation.json 修改 项目信息
        // 将 project 目录重命名
        // 修改项目中的别名
    }
    removeProject(name) {
        const noSameProjectName = this.config.projects.every(p => p.name !== name);
        if (noSameProjectName)
            return utils_1.throwError('Project not found', true);
        // tsconfig.json 删除 项目别名
        // workstation.json 删除 项目信息
        // 弹出确认框，删除不可恢复，请谨慎
        // 若确认，删除 project 目录
    }
}
exports.WorkstationService = WorkstationService;
exports.$workstation = new WorkstationService();
//# sourceMappingURL=workstation.service.js.map