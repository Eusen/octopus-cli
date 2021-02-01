import {copySync, moveSync} from 'fs-extra';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import $path from 'path';
import {WorkstationCreatorBase} from './_base';
import {$workstation} from '../workstation.service';
import {exec, fromRoot, initRootPath} from '../../../utils';

export class VueWorkstationCreator extends WorkstationCreatorBase {
  async create(): Promise<void> {
    await exec(`vue create ${this.name} --no-git`);
    // vue 项目创建成功，初始化根目录
    initRootPath(this.name);

    // 1. 生成 workstation 配置文件
    await $workstation.setConfig({
      name: this.name,
      type: 'vue',
      language: existsSync(fromRoot('tsconfig.json')) ? 'ts' : 'js',
      projects: [
        {
          name: 'main',
          root: 'project/main',
          port: 9621
        }
      ]
    });

    // 生成第一个 main 项目
    console.log(`📄  Generating main project...`);
    await this.initMainProject();

    // 将全局的 public 移动至 main 项目中
    console.log(`📄  Move public to main project...`);
    await this.movePublicFiles();

    // 生成 vue.config.js
    console.log(`📄  Generating vue.config.js...`);
    this.createVueConfigFile();

    // package 中修改相关 scripts
    console.log(`📄  Reset package scripts...`);
    this.resetPackageScripts();

    // 修改 @vue/cli 中的部分内容，以支持多项目结构
    console.log(`📄  Modify '@vue/cli' to support multi project...`);
    this.modifyVueCLI();

    // 本地安装 @octopus/cli
    console.log(`⚙ Installing Octopus CLI service. This might take a while..`);
    await exec(`cd ${fromRoot()} && npm i -D https://github.com/Eusen/octopus-cli.git`);
  }

  async initMainProject() {
    const srcPath = fromRoot('src');
    const mainProjectPath = fromRoot('project/main');
    moveSync(srcPath, mainProjectPath);

    if ($workstation.config.language === 'ts') {
      ['shims-tsx.d.ts', 'shims-vue.d.ts'].forEach(dts => {
        const oldDts = $path.join(mainProjectPath, dts);
        if (existsSync(oldDts)) {
          const newDts = $path.join(srcPath, dts);
          moveSync(oldDts, newDts);
        }
      });
    }
  }

  movePublicFiles() {
    const publicPath = fromRoot('public');
    const mainProjectAssetsPath = fromRoot('project/main/assets');
    moveSync($path.join(mainProjectAssetsPath, 'logo.png'), $path.join(publicPath, 'logo.png'))
    moveSync(publicPath, mainProjectAssetsPath, {overwrite: true});
  }

  createVueConfigFile() {
    const vueConfigPath = fromRoot('vue.config.js');
    writeFileSync(vueConfigPath, `module.exports = require('@octopus/cli').$project.export();\n`);
  }

  resetPackageScripts() {
    const packageJsonPath = fromRoot('package.json');
    const json = require(packageJsonPath);
    json.scripts = {
      serve: 'ops serve',
      build: 'ops build',
    };
    writeFileSync(packageJsonPath, JSON.stringify(json, null, 2));
  }

  modifyVueCLI() {
    const rootPath = fromRoot('node_modules/@vue/cli-service');

    const optionsPath = $path.join(rootPath, 'lib/options.js');
    let optionsContent = readFileSync(optionsPath).toString();
    if (!optionsContent.includes('staticDir')) {
      const index = optionsContent.indexOf('publicPath:');
      optionsContent =
          optionsContent.substring(0, index) +
          `hmr: joi.boolean(),\n  staticDir: joi.string().allow(''),\n  ` +
          optionsContent.substring(index, optionsContent.length);
      writeFileSync(optionsPath, optionsContent);
    }

    const servePath = $path.join(rootPath, 'lib/commands/serve.js');
    let serveContent = readFileSync(servePath).toString();
    if (!serveContent.indexOf('staticDir')) {
      serveContent = serveContent.replace(/api\.resolve\('public'\)/g, `api.resolve(options.staticDir || 'public')`);
      serveContent = serveContent.replace('hot: !isProduction', 'hot: !isProduction && options.hmr');
      writeFileSync(servePath, serveContent);
    }

    const appPath = $path.join(rootPath, 'lib/config/app.js');
    let appContent = readFileSync(appPath).toString();
    if (!appContent.indexOf('staticDir')) {
      appContent = appContent.replace(/api\.resolve\('public'\)/g, `api.resolve(options.staticDir || 'public')`);
      writeFileSync(appPath, appContent);
    }
  }
}
