"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueWorkstationCreator = void 0;
const _base_1 = require("./_base");
const _exec_1 = require("../../../utils/_exec");
class VueWorkstationCreator extends _base_1.WorkstationCreatorBase {
    create() {
        return new Promise((resolve, reject) => {
            _exec_1.exec(`vue create ${this.name}`);
        });
    }
}
exports.VueWorkstationCreator = VueWorkstationCreator;
//# sourceMappingURL=vue.js.map