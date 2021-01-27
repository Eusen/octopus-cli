export declare abstract class WorkstationCreatorBase {
    name: string;
    constructor(name: string);
    abstract create(): Promise<void>;
}
