export interface ResCodes {
    success: "200";
    error: "400";
    nologin: "401";
    forbidden: "403";
    lost: "404";
}
export declare type ResCode = ResCodes[keyof ResCodes];
export interface ResSend {
    code: ResCode;
    data: string | Array<any> | Object;
    error: string | Array<any> | Object;
}
/**
 *
 */
export interface Levels {
    data: {
        TRACE: 'blue';
        DEBUG: 'cyan';
        INFO: 'green';
        WARN: 'yellow';
        ERROR: 'red';
        FATAL: 'magenta';
        MARK: 'grey';
    };
    type: {
        DEFAULT: 'INFO';
        TRACE: "TRACE";
        DEBUG: 'DEBUG';
        INFO: 'INFO';
        WARN: 'WARN';
        ERROR: 'ERROR:';
        FATAL: 'FATAL';
        MARK: 'MARK';
    };
}
export declare type Level = Levels[keyof Levels];
/**
 *
 */
export interface Options {
    openConsole?: boolean;
    useDateFolder?: boolean;
    dateFolderType?: string;
    level?: Level;
    folder?: string;
    filename?: string;
    maxSize?: number;
}
export interface LoggingEvent extends Options {
}
