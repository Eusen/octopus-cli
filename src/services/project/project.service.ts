import commander from 'commander';
import {exec} from '../../utils';
import {$workstation} from '../workstation/workstation.service';
import {VueProjectServe} from './proxys/vue';

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

  serve(project: string) {
    return exec(`vue-cli-service serve --project ${project}`);
  }

  build(project: string) {
    return exec(`vue-cli-service build --project ${project}`);
  }

  export() {
    $workstation.syncConfig();

    commander.program.option('--project [name]', 'target project').parse();

    const options = commander.program.opts();
    const projects = $workstation.config.projects!;


    switch (this.type) {
      case 'vue':
        const vueConfig = projects.filter(p => p.name === options.project)[0] || projects[0];
        if (!vueConfig) return {projectNameError: true};
        return new VueProjectServe().export(vueConfig);
    }
  }
}


export const $project = new ProjectService();
