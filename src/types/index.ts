
export interface ResCodes {
    success:"200",
    error:"400",
    nologin:"401",
    forbidden:"403",
    lost:"404",
}
export type ResCode = ResCodes[keyof ResCodes];
export interface ResSend {
    code:ResCode,
    data: string | Array<any> | Object,
    error:string | Array<any> | Object,
}


/**
 * 
 */
export interface Levels {
    data:{
        TRACE: 'blue';
        DEBUG: 'cyan';
        INFO:  'green';
        WARN: 'yellow';
        ERROR:'red';
        FATAL: 'magenta';
        MARK:'grey'; // 2^53
    },
    type:{
        DEFAULT:  'INFO',
        TRACE: "TRACE",
        DEBUG: 'DEBUG',
        INFO:  'INFO',
        WARN: 'WARN',
        ERROR:'ERROR:',
        FATAL: 'FATAL',
        MARK:'MARK',
    }

}
export type Level = Levels[keyof Levels];


/**
 * 
 */
export interface Options {
    // 是否开启console
    openConsole?:boolean;
    // 年月日创建，文件夹路径，默认日
    useDateFolder?:boolean;
    // 年月日创建，文件夹路径，默认日
    dateFolderType?:string;
    // 分级
    level?:Level;
    // 文件夹路径
    folder?:string;
    // 文件名称
    filename?:string;
    // 单个log最大size，kb
    maxSize?:number

}







export interface LoggingEvent extends Options {

}


