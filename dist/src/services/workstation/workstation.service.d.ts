import { ProjectConfig } from '../project/project.service';
export declare const WORKSTATION_TYPES_MAP: {
    vue: boolean;
    angular: boolean;
    react: boolean;
};
export declare type WorkstationTypes = keyof typeof WORKSTATION_TYPES_MAP;
export interface WorkstationConfig {
    name?: string;
    type?: WorkstationTypes;
    projects?: {
        [key: string]: ProjectConfig;
    };
}
export declare class WorkstationService {
    configPath: string;
    config: WorkstationConfig;
    constructor();
    private syncConfig;
    init(name: string): void;
    create(type: WorkstationTypes): void;
    addProject(name: string): void;
    renameProject(name: string): void;
    removeProject(name: string): void;
}
export declare const $workstation: WorkstationService;
