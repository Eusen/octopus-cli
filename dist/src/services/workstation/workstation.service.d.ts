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
    name: string;
    type: WorkstationTypes;
    language: WorkstationLanguages;
    projects: ProjectConfig[];
}
export declare class WorkstationService {
    ext: string[];
    configPath: string;
    config: WorkstationConfig;
    setConfig(config: WorkstationConfig): void;
    syncConfig(): void;
    create(name: string, type: WorkstationTypes): Promise<void>;
    private modifyProjectAlias;
    addProject(name: string): Promise<void>;
    renameProject(oldName: string, newName: string): void;
    removeProject(name: string): Promise<void>;
}
export declare const $workstation: WorkstationService;
