import { WorkstationCreatorBase } from './_base';
export declare class VueWorkstationCreator extends WorkstationCreatorBase {
    create(): Promise<void>;
    removeInitFiles(): void;
    createVueConfigFile(): void;
    resetPackageScripts(): void;
    modifyVueCLI(): void;
}
