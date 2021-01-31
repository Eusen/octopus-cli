import { ProjectConfig } from '../project/project.service';
export declare const WORKSTATION_TYPES_MAP: {
    vue: boolean;
    angular: boolean;
    react: boolean;
};
export declare type WorkstationTypes = keyof typeof WORKSTATION_TYPES_MAP;
export declare const WORKSTATION_LANGUAGES_MAP: {
    js: boolean;
    ts: boolean;
};
export declare type WorkstationLanguages = keyof typeof WORKSTATION_LANGUAGES_MAP;
export interface WorkstationConfig {
    name?: string;
    type?: WorkstationTypes;
    language?: WorkstationLanguages;
    projects?: ProjectConfig[];
}
export declare class WorkstationService {
    configPath: string;
    config: WorkstationConfig;
    setConfig(config: WorkstationConfig): Promise<any>;
    syncConfig(): Promise<any>;
    create(name: string, type: WorkstationTypes): Promise<void>;
    addProject(name: string): void;
    renameProject(name: string): void;
    removeProject(name: string): void;
}
export declare const $workstation: WorkstationService;
