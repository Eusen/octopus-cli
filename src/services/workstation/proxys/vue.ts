import {removeSync} from 'fs-extra';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import $path from 'path';
import {WorkstationCreatorBase} from './_base';
import {$workstation} from '../workstation.service';
import {cls, exec, fromRoot, initRootPath} from '../../../utils';

export class VueWorkstationCreator extends WorkstationCreatorBase {
  async create(): Promise<void> {
    await exec(`vue create ${this.name} --no-git`);
    cls();
    await this.initWorkstation();
    this.removeInitFiles();
    this.createVueConfigFile();
    this.resetPackageScripts();
    this.appendProjectToTsConfigIncludes();
    this.modifyVueCLI();
    await this.installDeps();
    await $workstation.addProject('main');
  }

  async initWorkstation() {
    initRootPath(this.name);

    console.log(`🔨  Generating workstation.json...`);
    await $workstation.setConfig({
      name: this.name,
      type: 'vue',
      language: existsSync(fromRoot('tsconfig.json')) ? 'ts' : 'js',
      projects: []
    });
  }

  removeInitFiles() {
    console.log(`🔥  Removing init files...`);

    const srcPath = fromRoot('src');
    const publicPath = fromRoot('public');
    removeSync(srcPath);
    removeSync(publicPath);
  }

  createVueConfigFile() {
    console.log(`🔨  Generating vue.config.js...`);

    const vueConfigPath = fromRoot('vue.config.js');
    writeFileSync(vueConfigPath, `module.exports = require('@octopus/cli').$project.export();\n`);
  }

  resetPackageScripts() {
    console.log(`📝  Resetting package scripts...`);

    const packageJsonPath = fromRoot('package.json');
    const json = require(packageJsonPath);
    json.scripts = {
      serve: 'ops serve',
      build: 'ops build',
    };
    writeFileSync(packageJsonPath, JSON.stringify(json, null, 2));
  }

  appendProjectToTsConfigIncludes() {
    console.log(`📝  Appending project dir to tsconfig.json...`);

    const tsconfigPath = fromRoot('tsconfig.json');
    const tsconfig = require(tsconfigPath);
    tsconfig.include.push('projects/**/*.ts');
    tsconfig.include.push('projects/**/*.tsx');
    tsconfig.include.push('projects/**/*.vue');
  }

  modifyVueCLI() {
    console.log(`🔧  Modifying '@vue/cli' to support multi project...`);

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

  async installDeps() {
    console.log(`🚀  Installing Octopus CLI service. This might take a while..`);
    await exec([
      `cd ${fromRoot()}`,
      'npm i -D https://github.com/Eusen/octopus-cli.git',
    ].join(' && '));
  }
}
