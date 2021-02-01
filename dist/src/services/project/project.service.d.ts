export interface ProjectConfig {
    name?: string;
    root?: string;
    port?: number;
}
export declare class ProjectService {
    get type(): "vue" | "angular" | "react" | undefined;
    create(name: string): Promise<void>;
    serve(project: string): Promise<any>;
    build(project: string): Promise<any>;
    export(): import("./proxys/vue").VueProjectConfig | {
        projectNameError: boolean;
    } | undefined;
}
export declare const $project: ProjectService;
