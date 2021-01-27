const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const packageJson = require('../package.json');

(() => {
  fs.rmdirSync('../dist', {recursive: true});

  const isAllPackagesInstalled = Object.keys(packageJson.dependencies).every(packageName => {
    const packagePath = path.join(__dirname, `../node_modules/${packageName}`);
    return fs.existsSync(packagePath);
  });

  if (!isAllPackagesInstalled) {
    childProcess.execSync(`cd ${path.join(__dirname, '..')} && npm i`);
  }
})();
