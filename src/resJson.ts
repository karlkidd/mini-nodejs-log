import { ResCodes, Levels  } from "./types";


export const resCode:ResCodes = {
    success:"200",
    error:"400",
    nologin:"401",
    forbidden:"403",
    lost:"404",
}

export const levels:Levels  = {
    data:{
        TRACE: 'blue',
        DEBUG: 'cyan',
        INFO:  'green',
        WARN: 'yellow',
        ERROR:'red',
        FATAL: 'magenta',
        MARK:'grey',
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
