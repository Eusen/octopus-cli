import {WorkstationCreatorBase} from "./_base";
import {exec, initRootPath} from "../../../utils";
import {$workstation} from "../workstation.service";

export class VueWorkstationCreator extends WorkstationCreatorBase {
  create(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`vue create ${this.name}`).then(async resp => {
        // vue 项目创建成功
        // 第一步：生成 workstation 配置文件
        initRootPath(this.name);
        await $workstation.syncConfig();
      });
    });
  }
}
