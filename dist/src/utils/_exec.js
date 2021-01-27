"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
function exec(cmd) {
    child_process_1.spawn(cmd, {
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true,
    });
}
exports.exec = exec;
//# sourceMappingURL=_exec.js.map