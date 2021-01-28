"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
function exec(cmd) {
    return new Promise((resolve, reject) => {
        const _process = child_process_1.spawn(cmd, {
            stdio: [process.stdin, process.stdout, process.stderr],
            shell: true,
        });
        _process.addListener("error", (err) => reject(err));
        _process.addListener("exit", (code, signal) => resolve({ code, signal }));
    });
}
exports.exec = exec;
//# sourceMappingURL=_exec.js.map