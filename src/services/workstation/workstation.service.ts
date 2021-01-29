import chalk from "chalk";
import {existsSync, writeFileSync} from 'fs';
import {formRoot, getRootPath, getWorkstationDirname} from '../../utils';
import {ProjectConfig} from '../project/project.service';
import {VueWorkstationCreator} from "./proxys/vue";

export const WORKSTATION_TYPES_MAP = {
  vue: true,
  angular: true,
  react: true,
};

export declare type WorkstationTypes = keyof typeof WORKSTATION_TYPES_MAP;

export interface WorkstationConfig {
  name?: string;
  type?: WorkstationTypes;
  projects?: { [key: string]: ProjectConfig };
}

export class WorkstationService {
  configPath = '';
  config!: WorkstationConfig;

  syncConfig(type: WorkstationTypes) {
    return new Promise<any>((resolve) => {
      if (!getRootPath()) {
        console.log(chalk.red('The ops cli requires to be run in an Octopus workstation, but a workstation definition could not be found.'))
        return resolve(false);
      }

      if (!this.configPath) {
        this.configPath = formRoot('workstation.json');
      }

      if (existsSync(this.configPath)) {
        this.config = require(this.configPath);
      }

      if (!this.config) {
        this.config = {
          name: getWorkstationDirname(),
          type,
          projects: {},
        };
      }

      writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));

      resolve(true);
    });
  }

  create(name: string, type: WorkstationTypes) {
    switch (type) {
      case "vue":
        return new VueWorkstationCreator(name).create();
    }
  }

  addProject(name: string) {
  }

  renameProject(name: string) {
  }

  removeProject(name: string) {
  }
}

export const $workstation = new WorkstationService();
