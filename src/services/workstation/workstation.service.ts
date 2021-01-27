import {formRoot, getWorkstationName} from '../../utils/_path';
import {ProjectConfig} from '../project/project.service';
import {existsSync, writeFileSync} from 'fs';

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
  configPath = formRoot('workstation.config.json');
  config: WorkstationConfig = {
    name: getWorkstationName(),
    type: '' as any,
    projects: {},
  };

  constructor() {
    this.syncConfig();
  }

  private syncConfig() {
    if (existsSync(this.configPath)) {
      this.config = require(this.configPath);
    }

    writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  init(name: string) {
  }

  create(type: WorkstationTypes) {
  }

  addProject(name: string) {
  }

  renameProject(name: string) {
  }

  removeProject(name: string) {
  }
}

export const $workstation = new WorkstationService();
