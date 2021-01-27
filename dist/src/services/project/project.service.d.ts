import { WorkstationTypes } from '../workstation/workstation.service';
export interface ProjectConfig {
    name?: string;
    root?: string;
    port?: number;
}
export declare class ProjectService {
    getDefaultConfig(type: WorkstationTypes, config: ProjectConfig): ProjectConfig;
}
export declare const $project: ProjectService;
