"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueProjectServe = void 0;
class VueProjectServe {
    export(config) {
        return {
            outputDir: `dist/${config.name}`,
            staticDir: `${config.root}/assets`,
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
}
exports.VueProjectServe = VueProjectServe;
//# sourceMappingURL=vue.js.map