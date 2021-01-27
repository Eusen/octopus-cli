import inquirer from 'inquirer';
import {WORKSTATION_TYPES_MAP} from "../services/workstation/workstation.service";

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

export function getName(type: string) {
  return inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: `Give ${type} a name`
  }]);
}

export function getWorkstationType() {
  return inquirer.prompt([{
    type: 'list',
    name: 'type',
    choices: Object.keys(WORKSTATION_TYPES_MAP),
    message: 'Which framework do you want to use?'
  }]).then(resp => resp.type);
}
