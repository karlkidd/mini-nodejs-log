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
const fs = require('fs');
const resJson = require("./resJson");
/**
 * 创建文件夹
 * @param {String} pathName
 * @returns
 */
const readdir = (pathName) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.readdir(pathName, (err, data) => {
            if (err) {
                resolve({ code: resJson.resCode.error, data: [], error: err });
            }
            else {
                resolve({ code: resJson.resCode.success, data, error: "" });
            }
        });
    });
});
/**
 * 创建文件夹
 * @param {String} pathName
 * @returns
 */
const readFile = (pathName) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.readFile(pathName, (err, data) => {
            if (err) {
                resolve({ code: resJson.resCode.error, data: "", error: err });
            }
            else {
                resolve({ code: resJson.resCode.success, data, error: "" });
            }
        });
    });
});
/**
 * 写文件
 * @param {String} pathName
 * @param {String | NodeJS.ArrayBufferView} content
 * @param {fs.WriteFileOptions} options
 * @returns
 */
const writeFile = (pathName, content, options = {}) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathName, content, options, (err, data) => {
            if (err) {
                resolve({ code: resJson.resCode.error, data: "", error: err });
            }
            else {
                resolve({ code: resJson.resCode.success, data, error: "" });
            }
        });
    });
});
/**
 * 写文件
 * @param {String} pathName
 * @param {String | NodeJS.ArrayBufferView} content
 * @param {fs.WriteFileOptions} options
 * @returns
 */
const appendFile = (pathName, content, options = {}) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.appendFile(pathName, content, options, (err, data) => {
            if (err) {
                resolve({ code: resJson.resCode.error, data: "", error: err });
            }
            else {
                resolve({ code: resJson.resCode.success, data, error: "" });
            }
        });
    });
});
/**
 * 判断文件/文件夹的状态
 * @param {String} pathName
 * @returns
 */
const stat = (pathName) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.stat(pathName, (err, data) => {
            if (err) {
                resolve({ code: resJson.resCode.error, data: { size: 0 }, error: err });
            }
            else {
                resolve({ code: resJson.resCode.success, data: data, error: "" });
            }
        });
    });
});
/**
 * 创建文件夹
 * @param {String} pathName
 * @returns
 */
const mkdir = (pathName) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        pathName = pathName || '';
        let pathList = pathName.split('/');
        let errorList = {};
        let currentPath = '';
        let errCount = 0;
        for (let i in pathList) {
            currentPath += `${pathList[i]}/`; // 构造当前路径
            if (!fs.existsSync(currentPath)) { // 判断当前路径是否存在
                let res = fs.mkdirSync(currentPath); // 如果不存在则创建该目录                
                if (res) {
                    errCount++;
                    errorList[i] = res;
                }
            }
        }
        if (errCount > 0) {
            resolve({ code: resJson.resCode.error, error: errorList, data: "" });
        }
        else {
            resolve({ code: resJson.resCode.success, data: "", error: "" });
        }
    });
});
class FsCrypt {
    constructor() {
        this.readdir = readdir;
        this.readFile = readFile;
        this.writeFile = writeFile;
        this.stat = stat;
        this.mkdir = mkdir;
        this.appendFile = appendFile;
    }
}
exports.default = new FsCrypt();
