import {$workstation} from "../workstation/workstation.service";

export interface ProjectConfig {
  name?: string;
  root?: string;
  port?: number;
}

export class ProjectService {
  get type() {
    return $workstation.config.type;
  }

  async create(name: string) {
  }

  serve() {
  }
}


export const $project = new ProjectService();
