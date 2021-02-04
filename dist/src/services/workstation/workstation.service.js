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
const common_1 = require("../../commands/common");
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
    modifyProjectAlias(rootPath, oldAlias, newAlias) {
        if (fs_1.statSync(rootPath).isDirectory()) {
            const subDirs = fs_1.readdirSync(rootPath);
            for (const dir of subDirs) {
                this.modifyProjectAlias(path_1.default.join(rootPath, dir), oldAlias, newAlias);
            }
        }
        else {
            if (!this.ext.includes(path_1.default.extname(rootPath).substring(1)))
                return;
            let content = fs_1.readFileSync(rootPath).toString();
            content = content.replace(new RegExp(oldAlias, 'g'), newAlias);
            const name = newAlias.replace('@', '').replace('/', '');
            content = content.replace('@ is an alias to /src', `@${name} is an alias to /project/${name}`);
            fs_1.writeFileSync(rootPath, content);
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
        console.log(`📝 Copying project template file to workstation...`);
        [
            `templates/project/${this.config.type}/common`,
            `templates/project/${this.config.type}/${this.config.language}`,
        ].forEach(dir => {
            fs_extra_1.copySync(utils_1.fromCLIRoot(dir), utils_1.fromRoot(root), { recursive: true, preserveTimestamps: true });
        });
        console.log(`📝 Modifying project alias...`);
        this.modifyProjectAlias(utils_1.fromRoot(root), '@/', alias);
        console.log(`✨ Successfully created project ${chalk_1.default.yellow(name)}.`);
        console.log(`✨ Get started with the following commands:`);
        console.log();
        if (process.cwd() !== utils_1.fromRoot()) {
            console.log(` $ ${chalk_1.default.blueBright(`cd ${this.config.name}`)}`);
        }
        console.log(` $ ${chalk_1.default.blueBright(`ops serve ${name}`)}`);
        console.log();
    }
    renameProject(oldName, newName) {
        const noSameProjectName = this.config.projects.every(p => p.name !== oldName);
        if (noSameProjectName)
            return utils_1.throwError('Project not found', true);
        const oldAlias = `@${oldName}/`;
        const newAlias = `@${newName}/`;
        if (this.config.language === 'ts') {
            console.log(`📝 Renaming project alias in tsconfig.json...`);
            const tsconfigPath = utils_1.fromRoot('tsconfig.json');
            const tsconfig = require(tsconfigPath);
            delete tsconfig.compilerOptions.paths[`${oldAlias}*`];
            tsconfig.compilerOptions.paths[`${newAlias}*`] = [`projects/${newName}/*`];
            fs_1.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        }
        console.log(`📝 Modify project info in workstation.json...`);
        this.config.projects = this.config.projects.map(p => {
            if (p.name === oldName) {
                p.name = newName;
                p.root = `projects/${newName}`;
            }
            return p;
        });
        this.syncConfig();
        console.log(`📝 Renaming project dir...`);
        const root = `projects/${newName}`;
        fs_extra_1.moveSync(utils_1.fromRoot(`projects/${oldName}`), utils_1.fromRoot(root));
        console.log(`📝 Renaming project dir...`);
        this.modifyProjectAlias(utils_1.fromRoot(root), oldAlias, newAlias);
        console.log(`✨ Successfully rename project ${chalk_1.default.yellow(newName)}.`);
    }
    async removeProject(name) {
        const noSameProjectName = this.config.projects.every(p => p.name !== name);
        if (noSameProjectName)
            return utils_1.throwError('Project not found', true);
        const resp = await common_1.confirm(chalk_1.default.red('It cannot be restored after remove. Are you sure you want to remove it.'));
        if (!resp)
            return;
        if (this.config.language === 'ts') {
            console.log(`🔥 Removing project alias in tsconfig.json...`);
            const tsconfigPath = utils_1.fromRoot('tsconfig.json');
            const tsconfig = require(tsconfigPath);
            delete tsconfig.compilerOptions.paths[`@${name}/*`];
            fs_1.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        }
        console.log(`🔥 Removing project info in workstation.json...`);
        this.config.projects = this.config.projects.filter(p => p.name !== name);
        this.syncConfig();
        console.log(`🔥 Removing project...`);
        fs_extra_1.removeSync(utils_1.fromRoot(`projects/${name}`));
        console.log(chalk_1.default.red(`✨ Successfully remove project ${chalk_1.default.yellow(name)}, hope you don't regret it ~`));
    }
    repair() {
        switch (this.config.type) {
            case 'vue':
                return new vue_1.VueWorkstationCreator('').modifyVueCLI();
        }
    }
}
exports.WorkstationService = WorkstationService;
exports.$workstation = new WorkstationService();
//# sourceMappingURL=workstation.service.js.map