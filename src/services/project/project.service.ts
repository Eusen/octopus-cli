import {WorkstationTypes} from '../workstation/workstation.service';
import {createVueProjectConfig} from './proxys/vue.project';

export interface ProjectConfig {
  name?: string;
  root?: string;
  port?: number;
}

export class ProjectService {
  getDefaultConfig(type: WorkstationTypes, config: ProjectConfig): ProjectConfig {
    switch (type) {
      case 'vue':
        return createVueProjectConfig(config) as any;
    }

    return {};
  }
}

export const $project = new ProjectService();
