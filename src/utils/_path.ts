import $path from 'path';

export function formRoot(...paths: string[]) {
  return $path.join(__dirname, '../../../../..', ...paths);
}

export function getWorkstationName() {
  return $path.basename(formRoot());
}
