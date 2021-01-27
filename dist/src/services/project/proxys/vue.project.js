"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVueProjectConfig = void 0;
function createVueProjectConfig(config) {
    return {
        outputDir: `dist/${config.name}`,
        devServer: {
            port: config.port,
        },
        pages: {
            index: {
                entry: `${config.root}/main.ts`,
                template: `${config.root}/index.html`,
                filename: 'index.html',
                title: config.name,
                chunks: ['chunk-vendors', 'chunk-common', 'index']
            }
        },
        ...config
    };
}
exports.createVueProjectConfig = createVueProjectConfig;
//# sourceMappingURL=vue.project.js.map