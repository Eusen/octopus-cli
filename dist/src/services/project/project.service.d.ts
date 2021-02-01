/// <reference types="@types/webpack-dev-server" />
export interface ProjectConfig {
    name?: string;
    root?: string;
    port?: number;
}
export declare class ProjectService {
    get type(): "vue" | "angular" | "react" | undefined;
    create(name: string): Promise<void>;
    serve(project: string): Promise<any>;
    export(): Promise<{
        publicPath?: string | undefined;
        outputDir: string;
        assetsDir?: string | undefined;
        indexPath?: string | undefined;
        filenameHashing?: boolean | undefined;
        pages: {
            [key: string]: string | import("./proxys/vue").VuePageConfig;
        } | {
            index: {
                entry: string;
                template: string;
                filename: string;
                title: string | undefined;
                chunks: string[];
            };
        };
        lintOnSave?: boolean | undefined;
        runtimeCompiler?: boolean | undefined;
        transpileDependencies?: (string | RegExp)[] | undefined;
        productionSourceMap?: boolean | undefined;
        crossorigin?: string | undefined;
        integrity?: boolean | undefined;
        configureWebpack?: any;
        chainWebpack?: ((config: import("webpack-chain")) => void) | undefined;
        css?: import("./proxys/vue").VueCssConfig | undefined;
        devServer: (import("webpack-dev-server").Configuration & {
            proxy?: string | string[] | ((pathname: string, req: import("http-proxy-middleware/dist/types").Request) => boolean) | import("http-proxy-middleware").Options | undefined;
        }) | {
            port: number | undefined;
        };
        parallel?: boolean | undefined;
        pwa?: import("./proxys/vue").VuePwaConfig | undefined;
        pluginOptions?: {
            [key: string]: any;
        } | undefined;
        name?: string | undefined;
        root?: string | undefined;
        port?: number | undefined;
        staticDir: string;
    } | {
        projectNameError: boolean;
    } | undefined>;
}
export declare const $project: ProjectService;
