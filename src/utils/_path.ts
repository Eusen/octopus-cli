import $path from 'path';
import {existsSync} from 'fs';

let rootPath = '';

/**
 * 如果返回的路径为空，则表示没有找到配置文件
 */
export function getRootPath() {
  if (rootPath) return rootPath;

  let currentPath = $path.resolve();
  let isRoot = false;
  while(!isRoot && !existsSync($path.join(currentPath, 'workstation.json'))) {
    const prevPath = $path.basename(currentPath);
    // 如果上一级路径与当前路径相同，则说明到了根路径
    if (prevPath === currentPath) {
      isRoot = true;
      break;
    } else {
      // 如果没到根路径，则继续找
      currentPath = prevPath;
    }
  }

  // 如果没到根路径，则说明找到了配置文件
  if (!isRoot) rootPath = currentPath;

  return rootPath;
}

export function initRootPath(name: string) {
  rootPath = $path.resolve(name);
}

export function fromRoot(...paths: string[]) {
  return $path.join(getRootPath(), ...paths);
}

export function fromCLIRoot(...paths: string[]) {
  return $path.join(__dirname, '../../../templates', ...paths);
}

export function getWorkstationDirname() {
  return $path.basename(fromRoot());
}
