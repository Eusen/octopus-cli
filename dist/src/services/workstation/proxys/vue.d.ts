import { WorkstationCreatorBase } from './_base';
export declare class VueWorkstationCreator extends WorkstationCreatorBase {
    create(): Promise<void>;
    initMainProject(): Promise<void>;
    movePublicFiles(): void;
    createVueConfigFile(): void;
    resetPackageScripts(): void;
    modifyVueCLI(): void;
}
