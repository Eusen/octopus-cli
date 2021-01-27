"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkstationDirname = exports.formRoot = exports.getRootPath = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
let rootPath = '';
/**
 * 如果返回的路径为空，则表示没有找到配置文件
 */
function getRootPath() {
    if (rootPath)
        return rootPath;
    let currentPath = path_1.default.resolve();
    let isRoot = false;
    while (!isRoot && !fs_1.existsSync(path_1.default.join(currentPath, 'workstation.json'))) {
        const prevPath = path_1.default.basename(currentPath);
        // 如果上一级路径与当前路径相同，则说明到了根路径
        if (prevPath === currentPath) {
            isRoot = true;
            break;
        }
        else {
            // 如果没到根路径，则继续找
            currentPath = prevPath;
        }
    }
    // 如果没到根路径，则说明找到了配置文件
    if (!isRoot)
        rootPath = currentPath;
    return rootPath;
}
exports.getRootPath = getRootPath;
function formRoot(...paths) {
    return path_1.default.join(getRootPath(), ...paths);
}
exports.formRoot = formRoot;
function getWorkstationDirname() {
    return path_1.default.basename(formRoot());
}
exports.getWorkstationDirname = getWorkstationDirname;
//# sourceMappingURL=_path.js.map