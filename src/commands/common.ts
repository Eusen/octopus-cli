import inquirer from 'inquirer';

export const EXTRA_TYPES_MAP = {
  project: true,
};

export type ExtraTypes = keyof typeof EXTRA_TYPES_MAP;

export function getExtraType() {
  return inquirer.prompt([{
    type: 'list',
    name: 'type',
    choices: Object.keys(EXTRA_TYPES_MAP),
    message: 'Which type do you want to add?'
  }]).then(resp => resp.type);
}

export function getExtraName(type: ExtraTypes) {
  return inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: `Give ${type} a name`
  }]);
}
