"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkstationName = exports.formRoot = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
function formRoot(...paths) {
    return path_1.default.join(__dirname, '../../../../..', ...paths);
}
exports.formRoot = formRoot;
function getWorkstationName() {
    return path_1.default.basename(formRoot());
}
exports.getWorkstationName = getWorkstationName;
//# sourceMappingURL=_path.js.map