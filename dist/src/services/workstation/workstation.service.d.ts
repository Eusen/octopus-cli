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
    syncConfig(): Promise<any>;
    create(name: string, type: WorkstationTypes): Promise<void> | undefined;
    addProject(name: string): void;
    renameProject(name: string): void;
    removeProject(name: string): void;
}
export declare const $workstation: WorkstationService;
