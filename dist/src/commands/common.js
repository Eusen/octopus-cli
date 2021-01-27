"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtraName = exports.getExtraType = exports.EXTRA_TYPES_MAP = void 0;
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
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
function getExtraName(type) {
    return inquirer_1.default.prompt([{
            type: 'input',
            name: 'name',
            message: `Give ${type} a name`
        }]);
}
exports.getExtraName = getExtraName;
//# sourceMappingURL=common.js.map