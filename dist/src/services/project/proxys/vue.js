"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueProjectServe = void 0;
class VueProjectServe {
    export(config) {
        const excludeKeys = ['name', 'port', 'root'];
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