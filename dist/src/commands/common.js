"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkstationType = exports.getName = exports.getExtraType = exports.EXTRA_TYPES_MAP = void 0;
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const workstation_service_1 = require("../services/workstation/workstation.service");
exports.EXTRA_TYPES_MAP = {
    project: true,
};
function getExtraType() {
    return inquirer_1.default.prompt([{
            type: 'list',
            name: 'type',
            choices: Object.keys(exports.EXTRA_TYPES_MAP),
            message: 'Which type do you want to add?'
        }]).then(resp => resp.type);
}
exports.getExtraType = getExtraType;
function getName(type) {
    return inquirer_1.default.prompt([{
            type: 'input',
            name: 'name',
            message: `Give ${type} a name`
        }]);
}
exports.getName = getName;
function getWorkstationType() {
    return inquirer_1.default.prompt([{
            type: 'list',
            name: 'type',
            choices: Object.keys(workstation_service_1.WORKSTATION_TYPES_MAP),
            message: 'Which framework do you want to use?'
        }]).then(resp => resp.type);
}
exports.getWorkstationType = getWorkstationType;
//# sourceMappingURL=common.js.map