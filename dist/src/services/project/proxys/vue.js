"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueProjectServe = void 0;
const workstation_service_1 = require("../../workstation/workstation.service");
const utils_1 = require("../../../utils");
class VueProjectServe {
    export(config) {
        const excludeKeys = ['name', 'port', 'root'];
        return {
            outputDir: `dist/${config.name}`,
            staticDir: `${config.root}/static`,
            devServer: {
                port: config.port,
            },
            pages: {
                index: {
                    entry: `${config.root}/main.${workstation_service_1.$workstation.config.language}`,
                    template: `${config.root}/index.html`,
                    filename: 'index.html',
                    title: config.name,
                    chunks: ['chunk-vendors', 'chunk-common', 'index']
                }
            },
            configureWebpack: {
                resolve: {
                    alias: workstation_service_1.$workstation.config.projects.reduce((alias, project) => {
                        alias[`@${project.name}`] = utils_1.fromRoot(`project/${project.name}`);
                        return alias;
                    }, {}),
                }
            },
            ...Object.keys(config).reduce((c, key) => {
                const typeKey = key;
                if (!excludeKeys.includes(key))
                    c[typeKey] = config[typeKey];
                return c;
            }, {}),
        };
    }
}
exports.VueProjectServe = VueProjectServe;
//# sourceMappingURL=vue.js.map