import { WorkstationCreatorBase } from "./_base";
export declare class VueWorkstationCreator extends WorkstationCreatorBase {
    create(): Promise<void>;
    removeVueInitFiles(): Promise<void>;
    createVueConfigFile(): Promise<void>;
}
