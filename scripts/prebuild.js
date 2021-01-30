const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const packageJson = require('../package.json');

(() => {
  fs.rmdirSync('../dist', {recursive: true});

  const isAllPackagesInstalled = [
      ...Object.keys(packageJson.dependencies),
      ...Object.keys(packageJson.devDependencies),
  ].every(packageName => {
    const packagePath = fromRoot(`../node_modules/${packageName}`);
    return fs.existsSync(packagePath);
  });

  if (!isAllPackagesInstalled) {
    childProcess.execSync(`cd ${fromRoot('..')} && npm i`);
  }
})();

function fromRoot(...paths) {
  return path.join(__dirname, ...paths);
}
