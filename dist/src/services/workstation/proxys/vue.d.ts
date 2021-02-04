import { WorkstationCreatorBase } from './_base';
export declare class VueWorkstationCreator extends WorkstationCreatorBase {
    create(): Promise<void>;
    initWorkstation(): Promise<void>;
    removeInitFiles(): void;
    createVueConfigFile(): void;
    resetPackageScripts(): void;
    appendProjectToTsConfigIncludes(): void;
    modifyVueCLI(): void;
    installDeps(): Promise<void>;
}
