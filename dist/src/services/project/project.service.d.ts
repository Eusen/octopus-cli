export interface ProjectConfig {
    name?: string;
    root?: string;
    port?: number;
}
export declare class ProjectService {
    get type(): "vue" | "angular" | "react" | undefined;
    create(name: string): Promise<void>;
}
export declare const $project: ProjectService;
