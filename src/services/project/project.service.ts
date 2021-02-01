import {$workstation} from '../workstation/workstation.service';
import {VueProjectServe} from './proxys/vue';
import commander from 'commander';
import {exec} from '../../utils';

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

  async export() {
    await $workstation.syncConfig();

    commander.program.parse();

    const options = commander.program.opts();
    const projects = $workstation.config.projects!;

    console.log(options);

    switch (this.type) {
      case 'vue':
        const vueConfig = projects.filter(p => p.name === options.project)[0] || projects[0];
        if (!vueConfig) return {projectNameError: true};
        return new VueProjectServe().export(vueConfig);
    }
  }
}


export const $project = new ProjectService();
