import {WorkstationCreatorBase} from "./_base";
import {exec, initRootPath} from "../../../utils";
import {$workstation} from "../workstation.service";
import {$project} from "../../project/project.service";

export class VueWorkstationCreator extends WorkstationCreatorBase {
  async create(): Promise<void> {
    await exec(`vue create ${this.name}`)
    // vue 项目创建成功，初始化根目录
    initRootPath(this.name);

    // 1. 生成 workstation 配置文件
    await $workstation.setConfig({
      name: this.name,
      type: "vue",
      projects: {},
    });

    // 2. 删除一些初始文件
    await this.removeVueInitFiles();
    // 3. 生成第一个 main 项目
    await $project.create(this.name);
    // 4. 本地安装 @octopus/cli
    await exec('npm i https://github.com/Eusen/octopus-cli.git');
    // 5. 生成 vue.config.js
    await this.createVueConfigFile();
  }

  async removeVueInitFiles() {
  }

  async createVueConfigFile() {
  }
}
