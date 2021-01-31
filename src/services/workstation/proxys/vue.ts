import {moveSync} from 'fs-extra';
import {existsSync, writeFileSync} from 'fs';
import $path from 'path';
import {WorkstationCreatorBase} from './_base';
import {$workstation} from '../workstation.service';
import {exec, fromRoot, initRootPath} from '../../../utils';

export class VueWorkstationCreator extends WorkstationCreatorBase {
  async create(): Promise<void> {
    await exec(`vue create ${this.name} --no-git`);
    // vue 项目创建成功，初始化根目录
    initRootPath(this.name);

    // 1. 生成 workstation 配置文件
    await $workstation.setConfig({
      name: this.name,
      type: 'vue',
      language: existsSync(fromRoot('tsconfig.json')) ? 'ts' : 'js',
      projects: [
        {
          name: 'main',
          root: 'project/main',
          port: 9621
        }
      ]
    });

    // 2. 生成第一个 main 项目
    console.log(`📄  Generating main project...`);
    await this.initMainProject();
    // 3. 生成 vue.config.js
    console.log(`📄  Generating vue.config.js...`);
    await this.createVueConfigFile();
    // 4. 本地安装 @octopus/cli
    console.log(`⚙ Installing Octopus CLI service. This might take a while..`)
    await exec(`cd ${fromRoot()} && npm i https://github.com/Eusen/octopus-cli.git`);
  }

  async initMainProject() {
    const srcDir = fromRoot('src');
    const mainProjectPath = fromRoot('project/main');
    moveSync(srcDir, mainProjectPath);

    if ($workstation.config.language === 'ts') {
      ['shims-tsx.d.ts', 'shims-vue.d.ts'].forEach(dts => {
        const oldDts = $path.join(mainProjectPath, dts);
        if (existsSync(oldDts)) {
          const newDts = $path.join(srcDir, dts);
          moveSync(oldDts, newDts);
        }
      });
    }
  }

  async createVueConfigFile() {
    writeFileSync(fromRoot('vue.config.js'), `module.exports = require('@octopus/cli').$project.export();\n`);
  }
}
