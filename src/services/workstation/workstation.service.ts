import chalk from 'chalk';
import {existsSync, writeFileSync} from 'fs';
import {fromRoot, getRootPath} from '../../utils';
import {ProjectConfig} from '../project/project.service';
import {VueWorkstationCreator} from './proxys/vue';

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
  name?: string;
  type?: WorkstationTypes;
  language?: WorkstationLanguages;
  projects?: ProjectConfig[];
}

export class WorkstationService {
  configPath = '';
  config!: WorkstationConfig;

  setConfig(config: WorkstationConfig) {
    this.config = config;
    return this.syncConfig();
  }

  syncConfig() {
    return new Promise<any>((resolve) => {
      if (!getRootPath()) {
        console.log(chalk.red('The ops cli requires to be run in an Octopus workstation, but a workstation definition could not be found.'))
        return resolve(false);
      }

      if (!this.configPath) {
        this.configPath = fromRoot('workstation.json');
      }

      if (existsSync(this.configPath)) {
        this.config = require(this.configPath);
      }

      writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));

      resolve(true);
    });
  }

  create(name: string, type: WorkstationTypes) {
    switch (type) {
      case 'vue':
        return new VueWorkstationCreator(name).create();
    }

    return Promise.resolve();
  }

  addProject(name: string) {
  }

  renameProject(name: string) {
  }

  removeProject(name: string) {
  }
}

export const $workstation = new WorkstationService();
