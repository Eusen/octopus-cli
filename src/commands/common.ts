import inquirer from 'inquirer';
import {$workstation, WORKSTATION_TYPES_MAP} from '../services/workstation/workstation.service';

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
  }]).then(resp => resp.name);
}

export function getWorkstationType() {
  return inquirer.prompt([{
    type: 'list',
    name: 'type',
    choices: Object.keys(WORKSTATION_TYPES_MAP),
    message: 'Which framework do you want to use?'
  }]).then(resp => resp.type);
}

export function selectProject() {
  return inquirer.prompt([{
    type: 'list',
    name: 'name',
    choices: $workstation.config.projects.map(p => p.name),
    message: 'Which project do you want to select?'
  }]).then(resp => resp.name);
}
