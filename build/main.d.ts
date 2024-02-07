import { Options } from "./types/index";
export declare const Levels: {
    TRACE: "blue";
    DEBUG: "cyan";
    INFO: "green";
    WARN: "yellow";
    ERROR: "red";
    FATAL: "magenta";
    MARK: "grey";
};
export declare const LevelsType: {
    DEFAULT: "INFO";
    TRACE: "TRACE";
    DEBUG: "DEBUG";
    INFO: "INFO";
    WARN: "WARN";
    ERROR: "ERROR:";
    FATAL: "FATAL";
    MARK: "MARK";
};
export declare const ResCode: import("./types").ResCodes;
export declare const DateList: {
    data: {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
    };
    type: {
        year: string;
        month: string;
        day: string;
    };
};
export declare class Logger {
    folder: string;
    filename: string;
    openConsole: boolean;
    useDateFolder: boolean;
    dateFolderType: string;
    level: string;
    levelType: string;
    maxSize: number;
    defaultSize: number;
    logIndex: number;
    logName: string;
    logFolderName: string;
    [propsname: string]: any;
    constructor(options: Options);
    /**
     * 初始化
     * @param options
     */
    init(options: Options): void;
    /**
     * 初始化level
     * @param options
     * @returns
     */
    initLevelFun(options: string): string;
    /**
     * 获取log文件索引
     * @returns
     */
    getLogIndex(): Promise<number>;
    /**
     * 创建log文件索引
     * @returns
     */
    createLogName(): string;
    /**
     * 打印console
     * @param logs
     * @returns
     */
    consoleFun(logs: any): void;
    /**
     * 写log
     * @param text
     */
    addLogs(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
    Info(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
    TRACE(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
    DEBUG(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
    WARN(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
    ERROR(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
    FATAL(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
    MARK(text: any, levels: string): Promise<{
        writeRes: any;
        mkdirRes: any;
        statRes: any;
        folderName: string;
        logName: string;
    }>;
}
