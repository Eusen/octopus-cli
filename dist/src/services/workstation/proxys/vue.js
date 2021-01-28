"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueWorkstationCreator = void 0;
const _base_1 = require("./_base");
const utils_1 = require("../../../utils");
const workstation_service_1 = require("../workstation.service");
class VueWorkstationCreator extends _base_1.WorkstationCreatorBase {
    create() {
        return new Promise((resolve, reject) => {
            utils_1.exec(`vue create ${this.name}`).then(async (resp) => {
                // vue 项目创建成功
                // 第一步：生成 workstation 配置文件
                utils_1.initRootPath(this.name);
                await workstation_service_1.$workstation.syncConfig();
            });
        });
    }
}
exports.VueWorkstationCreator = VueWorkstationCreator;
//# sourceMappingURL=vue.js.map