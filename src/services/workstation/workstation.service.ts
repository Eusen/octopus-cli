import {existsSync, writeFileSync, statSync, readdirSync, readFileSync} from 'fs';
import {copySync, moveSync, removeSync} from 'fs-extra';
import $path from 'path';
import chalk from 'chalk';
import {exec, fromCLIRoot, fromRoot, getRootPath, throwError} from '../../utils';
import {ProjectConfig} from '../project/project.service';
import {VueWorkstationCreator} from './proxys/vue';
import {confirm} from "../../commands/common";

export const WORKSTATION_TYPES_MAP = {
  vue: true,
  angular: true,
  react: true,
};

export declare type WorkstationTypes = keyof typeof WORKSTATION_TYPES_MAP;

export const WORKSTATION_LANGUAGES_MAP = {
  js: true,
  ts: true,
};
export declare type WorkstationLanguages = keyof typeof WORKSTATION_LANGUAGES_MAP;

export interface WorkstationConfig {
  name: string;
  type: WorkstationTypes;
  language: WorkstationLanguages;
  projects: ProjectConfig[];
}

export class WorkstationService {
  ext = ['ts', 'tsx', 'js', 'jsx', 'vue'];
  configPath = '';
  config!: WorkstationConfig;

  setConfig(config: WorkstationConfig) {
    this.config = config;
    return this.syncConfig();
  }

  syncConfig() {
    if (!getRootPath()) {
      return throwError('The ops cli requires to be run in an Octopus workstation, ' +
        'but a workstation definition could not be found.', true);
    }

    if (!this.configPath) {
      this.configPath = fromRoot('workstation.json');
    }

    if (!this.config && existsSync(this.configPath)) {
      this.config = require(this.configPath);
    }

    writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  create(name: string, type: WorkstationTypes) {
    switch (type) {
      case 'vue':
        return new VueWorkstationCreator(name).create();
    }
    return Promise.resolve();
  }

  private modifyProjectAlias(rootPath: string, oldAlias: string, newAlias: string) {
    if (statSync(rootPath).isDirectory()) {
      const subDirs = readdirSync(rootPath);
      for (const dir of subDirs) {
        this.modifyProjectAlias($path.join(rootPath, dir), oldAlias, newAlias);
      }
    } else {
      if (!this.ext.includes($path.extname(rootPath).substring(1))) return;
      let content = readFileSync(rootPath).toString();
      content = content.replace(new RegExp(oldAlias, 'g'), newAlias);
      const name = newAlias.replace('@', '').replace('/', '');
      content = content.replace('@ is an alias to /src', `@${name} is an alias to /project/${name}`);
      writeFileSync(rootPath, content);
    }
  }

  async addProject(name: string) {
    console.log(`✨ Creating ${name} project...`);

    const noSameProjectName = this.config.projects.every(p => p.name !== name);
    if (!noSameProjectName) return throwError('A project with the same name already exists.', true);

    const alias = `@${name}/`;
    if (this.config.language === 'ts') {
      console.log(`📝 Appending project alias to tsconfig.json...`);
      const tsconfigPath = fromRoot('tsconfig.json');
      const tsconfig = require(tsconfigPath);
      tsconfig.compilerOptions.paths[`${alias}*`] = [`projects/${name}/*`];
      writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
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
      copySync(
        fromCLIRoot(dir),
        fromRoot(root),
        {recursive: true, preserveTimestamps: true},
      );
    });

    console.log(`📝 Modifying project alias...`);
    this.modifyProjectAlias(fromRoot(root), '@/', alias);

    console.log(`✨ Successfully created project ${chalk.yellow(name)}.`);
    console.log(`✨ Get started with the following commands:`);
    console.log();

    if (process.cwd() !== fromRoot()) {
      console.log(` $ ${chalk.blueBright(`cd ${this.config.name}`)}`);
    }

    console.log(` $ ${chalk.blueBright(`ops serve ${name}`)}`);
    console.log();
  }

  renameProject(oldName: string, newName: string) {
    const noSameProjectName = this.config.projects.every(p => p.name !== oldName);
    if (noSameProjectName) return throwError('Project not found', true);

    const oldAlias = `@${oldName}/`;
    const newAlias = `@${newName}/`;
    if (this.config.language === 'ts') {
      console.log(`📝 Renaming project alias in tsconfig.json...`);
      const tsconfigPath = fromRoot('tsconfig.json');
      const tsconfig = require(tsconfigPath);
      delete tsconfig.compilerOptions.paths[`${oldAlias}*`];
      tsconfig.compilerOptions.paths[`${newAlias}*`] = [`projects/${newName}/*`];
      writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
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
    moveSync(fromRoot(`projects/${oldName}`), fromRoot(root));

    console.log(`📝 Renaming project dir...`);
    this.modifyProjectAlias(fromRoot(root), oldAlias, newAlias);

    console.log(`✨ Successfully rename project ${chalk.yellow(newName)}.`);
  }

  async removeProject(name: string) {
    const noSameProjectName = this.config.projects.every(p => p.name !== name);
    if (noSameProjectName) return throwError('Project not found', true);

    const resp = await confirm(chalk.red('It cannot be restored after remove. Are you sure you want to remove it.'));
    if (!resp) return;

    if (this.config.language === 'ts') {
      console.log(`🔥 Removing project alias in tsconfig.json...`);
      const tsconfigPath = fromRoot('tsconfig.json');
      const tsconfig = require(tsconfigPath);
      delete tsconfig.compilerOptions.paths[`@${name}/*`];
      writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    }

    console.log(`🔥 Removing project info in workstation.json...`);
    this.config.projects = this.config.projects.filter(p => p.name !== name);
    this.syncConfig();

    console.log(`🔥 Removing project...`);
    removeSync(fromRoot(`projects/${name}`));

    console.log(chalk.red(`✨ Successfully remove project ${chalk.yellow(name)}, hope you don't regret it ~`));
  }

  repair() {
    switch (this.config.type) {
      case 'vue':
        return new VueWorkstationCreator('').modifyVueCLI();
    }
  }
}

export const $workstation = new WorkstationService();
