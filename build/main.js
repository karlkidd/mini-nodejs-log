"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const dayjs = require('dayjs');
const fsCrypt_1 = require("./fsCrypt");
const resJson = require("./resJson");
const logNameType = '.log';
const logLine = '\n\nlog==============log==============log\n\n';
exports.Levels = resJson.levels.data;
exports.LevelsType = resJson.levels.type;
exports.ResCode = resJson.resCode;
exports.DateList = {
    data: {
        year: "YYYY",
        month: "YYYY-MM",
        day: "YYYY-MM-DD",
        hour: "YYYY-MM-DD HH",
        minute: "YYYY-MM-DD HH:mm",
        second: "YYYY-MM-DD HH:mm:ss",
    },
    type: {
        year: "year",
        month: "month",
        day: "day",
    }
};
class Logger {
    constructor(options) {
        this.defaultSize = 1000;
        if (typeof options == 'object') {
            this.init(options);
        }
    }
    /**
     * 初始化
     * @param options
     */
    init(options) {
        // 参数
        this.folder = 'logs';
        if (typeof options.folder == 'string') {
            this.folder = options.folder;
        }
        this.openConsole = options.openConsole ? true : false;
        this.useDateFolder = options.useDateFolder ? true : false;
        // 年月日
        if (options.dateFolderType == 'y' || options.dateFolderType == 'year') {
            this.dateFolderType = exports.DateList.data.year;
        }
        else if (options.dateFolderType == 'm' || options.dateFolderType == 'month') {
            this.dateFolderType = exports.DateList.data.month;
        }
        else {
            this.dateFolderType = exports.DateList.data.day;
        }
        this.filename = options.filename || dayjs().format(exports.DateList.data.day);
        if (options.maxSize) {
            if (isNaN(Number(options.maxSize))) {
                this.maxSize = this.defaultSize;
            }
            else {
                let num = Number(options.maxSize);
                if (num > 100 * this.defaultSize) {
                    this.maxSize = 100 * this.defaultSize;
                }
                else if (num < 0) {
                    this.maxSize = this.defaultSize;
                }
                else {
                    this.maxSize = num;
                }
            }
        }
        else {
            this.maxSize = this.defaultSize;
        }
        let level = typeof options.level == 'string' ? options.level : '';
        this.level = this.initLevelFun(level);
        this.logIndex = 0;
        this.logName = '';
    }
    /**
     * 初始化level
     * @param options
     * @returns
     */
    initLevelFun(options) {
        let level = exports.LevelsType.INFO;
        if (typeof options == 'string' && options) {
            let objKeys = [];
            objKeys = Object.keys(exports.Levels);
            if (objKeys.includes(options)) {
                level = options;
            }
        }
        return level;
    }
    /**
     * 获取log文件索引
     * @returns
     */
    getLogIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            let readdirRes = {};
            readdirRes = yield fsCrypt_1.default.readdir(this.logFolderName);
            let data = [];
            data = readdirRes.data;
            let maxLogNum = 0;
            data.forEach((item) => {
                if (item.indexOf(this.filename) > -1) {
                    let res = item.split(`${logNameType}`)[0].split(`${this.filename}-`)[1] || '0';
                    if (Number(res) > Number(maxLogNum)) {
                        maxLogNum = Number(res);
                    }
                }
            });
            return maxLogNum;
        });
    }
    /**
     * 创建log文件索引
     * @returns
     */
    createLogName() {
        let filename = '';
        let nowName = '';
        filename = path.join(this.logFolderName, this.filename);
        let logIndex = "";
        logIndex = String(this.logIndex);
        if (logIndex.length < 8) {
            let len = 8 - logIndex.length;
            for (let i = 0; i < len; i++) {
                logIndex = '0' + logIndex;
            }
        }
        nowName = filename + '-' + logIndex;
        return nowName;
    }
    /**
     * 打印console
     * @param logs
     * @returns
     */
    consoleFun(logs) {
        if (!this.openConsole)
            return;
        let logObj = JSON.parse(logs);
        let data = JSON.parse(logObj.info);
        console.log(Object.assign({}, logObj, { info: data }));
    }
    /**
     * 写log
     * @param text
     */
    addLogs(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            let level = this.initLevelFun(levels);
            // 结果
            let mkdirRes = {};
            let writeRes = {};
            let filename = '';
            let foldername = '';
            // 循环创建文件夹
            if (this.useDateFolder) {
                foldername = (this.folder + `/${dayjs().format(this.dateFolderType)}/`).replace(/\/\//, '/');
            }
            else {
                foldername = (this.folder).replace(/\/\//, '/');
            }
            if (this.logFolderName != foldername) {
                yield fsCrypt_1.default.mkdir(foldername);
                this.logFolderName = foldername;
            }
            // 没有文件名，先获取最大index
            if (!this.logName) {
                this.logIndex = yield this.getLogIndex();
                filename = this.createLogName();
                this.logName = filename;
                // console.log(filename,'=======filename')
            }
            else {
                filename = this.logName;
            }
            // 
            let endName = filename + logNameType;
            let logtext = {};
            if (typeof text == 'string') {
                logtext = JSON.stringify({
                    date: dayjs().format(exports.DateList.data.second),
                    info: text,
                    level: level
                });
            }
            else if (typeof text == 'object') {
                let info = '';
                try {
                    info = JSON.stringify(text);
                }
                catch (error) {
                    console.log('addLogs() Function arguments is not json, JSON.stringify Error');
                    console.log(error);
                }
                logtext = JSON.stringify({
                    date: dayjs().format(exports.DateList.data.second),
                    info: info,
                    level: level
                });
            }
            // 写文件
            if (logtext) {
                let writeText = logtext + logLine;
                writeRes = yield fsCrypt_1.default.appendFile(endName, writeText);
            }
            else {
                writeRes = { message: "text为空，没有执行写入log" };
            }
            this.consoleFun(logtext);
            // 记录最大值
            let statRes = {};
            statRes = yield fsCrypt_1.default.stat(endName);
            if (statRes.code == exports.ResCode.success) {
                let fileSize = statRes.data.size || 0;
                // b - kb
                if (fileSize >= this.maxSize * 1000) {
                    this.logIndex += 1;
                    this.logName = this.createLogName();
                    fsCrypt_1.default.appendFile(this.logName + logNameType, '');
                }
            }
            return {
                writeRes,
                mkdirRes,
                statRes,
                folderName: this.logFolderName,
                logName: filename,
            };
        });
    }
    Info(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addLogs(text, exports.LevelsType.INFO);
        });
    }
    TRACE(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addLogs(text, exports.LevelsType.TRACE);
        });
    }
    DEBUG(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addLogs(text, exports.LevelsType.DEBUG);
        });
    }
    WARN(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addLogs(text, exports.LevelsType.WARN);
        });
    }
    ERROR(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addLogs(text, exports.LevelsType.ERROR);
        });
    }
    FATAL(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addLogs(text, exports.LevelsType.FATAL);
        });
    }
    MARK(text, levels) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addLogs(text, exports.LevelsType.MARK);
        });
    }
}
exports.Logger = Logger;
