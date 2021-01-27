export declare const EXTRA_TYPES_MAP: {
    project: boolean;
};
export declare type ExtraTypes = keyof typeof EXTRA_TYPES_MAP;
export declare function getExtraType(): Promise<any>;
export declare function getExtraName(type: ExtraTypes): Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
