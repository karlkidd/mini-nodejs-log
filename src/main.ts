const path = require('path');
const dayjs = require('dayjs');


import fsCrypt from "./fsCrypt";
import { Options,Level} from "./types/index";
import * as resJson from "./resJson";

const logNameType:string = '.log';
const logLine:string = '\n\nlog==============log==============log\n\n';

export const Levels = resJson.levels.data;
export const LevelsType = resJson.levels.type;
export const ResCode = resJson.resCode;
export const DateList = {
    data:{
        year:"YYYY",
        month:"YYYY-MM",
        day:"YYYY-MM-DD",
        hour:"YYYY-MM-DD HH",
        minute:"YYYY-MM-DD HH:mm",
        second:"YYYY-MM-DD HH:mm:ss",
    },
    type:{
        year:"year",
        month:"month",
        day:"day",
    }
}


export class Logger{
    folder:string
    filename:string
    openConsole:boolean
    useDateFolder:boolean
    dateFolderType:string
    level:string
    levelType:string
    maxSize:number
    defaultSize:number
    logIndex:number
    logName:string
    logFolderName:string
    [propsname:string]: any;

    constructor(options:Options){
        this.defaultSize = 1000;
        if(typeof options == 'object'){
            this.init(options)
        }
    }
    /**
     * 初始化
     * @param options 
     */
    init(options:Options){
        // 参数
        this.folder = 'logs';
        if(typeof options.folder == 'string'){
            this.folder = options.folder
        }
        this.openConsole = options.openConsole?true:false;
        this.useDateFolder = options.useDateFolder?true:false;
        // 年月日
        if(options.dateFolderType == 'y' || options.dateFolderType == 'year'){
            this.dateFolderType = DateList.data.year
        }else if(options.dateFolderType == 'm' || options.dateFolderType == 'month'){
            this.dateFolderType = DateList.data.month
        }else{
            this.dateFolderType = DateList.data.day
        }

        this.filename = options.filename || dayjs().format(DateList.data.day);

        if(options.maxSize){
           if( isNaN(Number(options.maxSize))){
            this.maxSize = this.defaultSize;
           }else{
            let num:number = Number(options.maxSize)
            if(num > 100*this.defaultSize){
                this.maxSize = 100*this.defaultSize
            }else if(num < 0){
                this.maxSize = this.defaultSize;
            }else{
                this.maxSize = num;
            }
           }
        }else{
            this.maxSize = this.defaultSize;
        }
        let level:string = typeof options.level == 'string'?options.level:''
        this.level = this.initLevelFun(level)

        this.logIndex = 0
        this.logName = '';
    }
    /**
     * 初始化level
     * @param options 
     * @returns 
     */
    initLevelFun(options:string){
        let level:string = LevelsType.INFO;
        if(typeof options == 'string' && options){
            let objKeys:Array<string> = [];
            objKeys = Object.keys(Levels)
            if(objKeys.includes(options)){
                level = options
            }
        }
        return level
    }
    /**
     * 获取log文件索引
     * @returns 
     */
    async getLogIndex(){
        let readdirRes:any = {};
        readdirRes = await fsCrypt.readdir(this.logFolderName);
        let data:Array<string> = [];
        data = readdirRes.data;
        let maxLogNum:number = 0;
        data.forEach((item:any)=>{
            if(item.indexOf(this.filename) > -1){
                let res:string = item.split(`${logNameType}`)[0].split(`${this.filename}-`)[1] || '0'
                if(Number(res) > Number(maxLogNum)){
                    maxLogNum = Number(res)
                }
            }
        })
        return maxLogNum
    }
    /**
     * 创建log文件索引
     * @returns 
     */
    createLogName(){
        let filename:string = ''
        let nowName:string = ''
        filename = path.join(this.logFolderName,this.filename);
        let logIndex:string = "";
        logIndex = String(this.logIndex);
        if(logIndex.length < 8){
            let len:number = 8 - logIndex.length;
            for(let i=0; i<len; i++){
                logIndex = '0' + logIndex
            }
        }
        nowName = filename + '-' + logIndex;
        return nowName
    }
    /**
     * 打印console
     * @param logs 
     * @returns 
     */
    consoleFun(logs:any){
        if(!this.openConsole)return;
        let logObj:any = JSON.parse(logs);
        let data:any = JSON.parse(logObj.info)
        console.log({
            ...logObj,
            info:data,
        })
    }
    /**
     * 写log
     * @param text 
     */
    async addLogs(text:any,levels:string){
        let level:string = this.initLevelFun(levels)
        // 结果
        let mkdirRes:any = {};
        let writeRes:any = {};
        let filename:string = '';
        let foldername:string = '';
        // 循环创建文件夹
        if(this.useDateFolder){
            foldername = (this.folder + `/${dayjs().format(this.dateFolderType)}/`).replace(/\/\//,'/');
        }else{
            foldername = (this.folder).replace(/\/\//,'/');
        }
        if(this.logFolderName != foldername){
            await fsCrypt.mkdir(foldername);
            this.logFolderName = foldername
        }
        // 没有文件名，先获取最大index
        if(!this.logName){
            this.logIndex = await this.getLogIndex()
            filename = this.createLogName();
            this.logName = filename;
            // console.log(filename,'=======filename')
        }else{
            filename = this.logName;
        }
        // 
        let endName:string = filename + logNameType;
        let logtext:any = {}
        if(typeof text == 'string'){
            logtext = JSON.stringify({
                date:dayjs().format(DateList.data.second),
                info:text,
                level:level
            });
        }else if(typeof text == 'object'){
            let info:string = '';
            try {
                info = JSON.stringify(text)
            } catch (error) {
                console.log('addLogs() Function arguments is not json, JSON.stringify Error')
                console.log(error)
            }
            logtext = JSON.stringify({
                date:dayjs().format(DateList.data.second),
                info:info,
                level:level
            });
        }

        // 写文件
        if(logtext){
            let writeText:string = logtext + logLine
            writeRes = await fsCrypt.appendFile(endName,writeText)
        }else{
            writeRes = {message:"text为空，没有执行写入log"}
        }
        this.consoleFun(logtext)
        // 记录最大值
        let statRes:any = {};
        statRes = await fsCrypt.stat(endName);
        if(statRes.code == ResCode.success){
            let fileSize:number = statRes.data.size || 0
            // b - kb
            if(fileSize >= this.maxSize * 1000){
                this.logIndex += 1;
                this.logName = this.createLogName();
                fsCrypt.appendFile(this.logName+logNameType,'')
            }
        }
        return {
            writeRes,
            mkdirRes,
            statRes,
            folderName:this.logFolderName,
            logName:filename,
        }
    }
    async Info(text:any,levels:string){
        return this.addLogs(text,LevelsType.INFO)
    }
    async TRACE(text:any,levels:string){
        return this.addLogs(text,LevelsType.TRACE)
    }
    async DEBUG(text:any,levels:string){
        return this.addLogs(text,LevelsType.DEBUG)
    }
    async WARN(text:any,levels:string){
        return this.addLogs(text,LevelsType.WARN)
    }
    async ERROR(text:any,levels:string){
        return this.addLogs(text,LevelsType.ERROR)
    }
    async FATAL(text:any,levels:string){
        return this.addLogs(text,LevelsType.FATAL)
    }
    async MARK(text:any,levels:string){
        return this.addLogs(text,LevelsType.MARK)
    }

}


