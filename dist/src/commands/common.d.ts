export declare const EXTRA_TYPES_MAP: {
    project: boolean;
};
export declare type ExtraTypes = keyof typeof EXTRA_TYPES_MAP;
export declare function getExtraType(): Promise<any>;
export declare function getName(type: string): Promise<any> & {
    ui: import("inquirer/lib/ui/prompt");
};
export declare function getWorkstationType(): Promise<any>;
