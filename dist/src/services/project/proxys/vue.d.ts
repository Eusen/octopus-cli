/// <reference types="@types/webpack-dev-server" />
import ChainableConfig from 'webpack-chain';
import { Configuration } from 'webpack-dev-server';
import { Filter as HttpProxyFilter, Options as HttpProxyOptions } from 'http-proxy-middleware';
import { ProjectConfig } from '../project.service';
export interface VuePageConfig {
    entry?: string;
    template?: string;
    filename?: string;
    title?: string;
    chunks?: string[];
}
export interface VueCssConfig {
    requireModuleExtension?: boolean;
    extract?: boolean;
    sourceMap?: boolean;
    loaderOptions?: {
        [key: string]: any;
    };
}
export interface VuePwaConfig {
    name?: string;
    themeColor?: string;
    msTileColor?: string;
    appleMobileWebAppCapable?: string;
    appleMobileWebAppStatusBarStyle?: string;
    workboxPluginMode?: 'InjectManifest' | 'GenerateSW';
    workboxOptions?: any;
}
export interface VueProjectConfig extends ProjectConfig {
    publicPath?: string;
    outputDir?: string;
    assetsDir?: string;
    indexPath?: string;
    filenameHashing?: boolean;
    pages?: {
        [key: string]: VuePageConfig | string;
    };
    lintOnSave?: boolean;
    runtimeCompiler?: boolean;
    transpileDependencies?: (string | RegExp)[];
    productionSourceMap?: boolean;
    crossorigin?: string;
    integrity?: boolean;
    configureWebpack?: any;
    chainWebpack?: (config: ChainableConfig) => void;
    css?: VueCssConfig;
    devServer?: Configuration & {
        proxy?: HttpProxyFilter | HttpProxyOptions;
    };
    parallel?: boolean;
    pwa?: VuePwaConfig;
    pluginOptions?: {
        [key: string]: any;
    };
}
export declare class VueProjectServe {
    export(config: VueProjectConfig): {
        publicPath?: string | undefined;
        outputDir: string;
        assetsDir?: string | undefined;
        indexPath?: string | undefined;
        filenameHashing?: boolean | undefined;
        pages: {
            [key: string]: string | VuePageConfig;
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
        chainWebpack?: ((config: ChainableConfig) => void) | undefined;
        css?: VueCssConfig | undefined;
        devServer: (Configuration & {
            proxy?: string | string[] | ((pathname: string, req: import("http-proxy-middleware/dist/types").Request) => boolean) | HttpProxyOptions | undefined;
        }) | {
            port: number | undefined;
        };
        parallel?: boolean | undefined;
        pwa?: VuePwaConfig | undefined;
        pluginOptions?: {
            [key: string]: any;
        } | undefined;
        name?: string | undefined;
        root?: string | undefined;
        port?: number | undefined;
        staticDir: string;
    };
}
