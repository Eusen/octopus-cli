import ChainableConfig from 'webpack-chain';
import {Configuration} from 'webpack-dev-server';
import {Filter as HttpProxyFilter, Options as HttpProxyOptions} from 'http-proxy-middleware';
import {ProjectConfig} from '../project.service';
import {$workstation} from '../../workstation/workstation.service';
import {fromRoot} from '../../../utils';

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
  loaderOptions?: { [key: string]: any };
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
  staticDir?: string;
  publicPath?: string;
  outputDir?: string;
  assetsDir?: string;
  indexPath?: string;
  filenameHashing?: boolean;
  pages?: { [key: string]: VuePageConfig | string };
  lintOnSave?: boolean;
  runtimeCompiler?: boolean;
  transpileDependencies?: (string | RegExp)[];
  productionSourceMap?: boolean;
  crossorigin?: string;
  integrity?: boolean;
  configureWebpack?: any;
  chainWebpack?: (config: ChainableConfig) => void;
  css?: VueCssConfig;
  devServer?: Configuration & { proxy?: HttpProxyFilter | HttpProxyOptions };
  parallel?: boolean;
  pwa?: VuePwaConfig;
  pluginOptions?: { [key: string]: any };
}

export type VueProjectConfigKeys = keyof VueProjectConfig;

export class VueProjectServe {
  export(config: VueProjectConfig): VueProjectConfig {
    const excludeKeys = ['name', 'port', 'root'];
    return {
      outputDir: `dist/${config.name}`,
      staticDir: `${config.root}/static`,
      devServer: {
        port: config.port,
      },
      pages: {
        index: {
          entry: `${config.root}/main.${$workstation.config.language}`,
          template: `${config.root}/index.html`,
          filename: 'index.html',
          title: config.name,
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
      },
      configureWebpack: {
        resolve: {
          alias: $workstation.config.projects.reduce((alias, project) => {
            alias[`@${project.name}`] = fromRoot(`project/${project.name}`);
            return alias;
          }, {} as any),
        }
      },
      ...Object.keys(config).reduce((c, key) => {
        const typeKey = key as VueProjectConfigKeys;
        if (!excludeKeys.includes(key)) c[typeKey] = config[typeKey];
        return c;
      }, {} as VueProjectConfig),
    }
  }
}
