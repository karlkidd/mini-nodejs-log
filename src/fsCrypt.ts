const fs = require('fs');
import * as resJson from "./resJson";


/**
 * 创建文件夹
 * @param {String} pathName 
 * @returns 
 */
const readdir = async (pathName:string)=>{
    return new Promise((resolve,reject)=>{
        fs.readdir(pathName,(err:any,data:any)=>{
            if (err) {
                resolve({code:resJson.resCode.error,data:[],error:err})
            }else{
                resolve({code:resJson.resCode.success,data,error:""})
            }
        })
    })
}

/**
 * 创建文件夹
 * @param {String} pathName 
 * @returns 
 */
const readFile = async (pathName:string)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(pathName,(err:any,data:any)=>{
            if (err) {
                resolve({code:resJson.resCode.error,data:"",error:err})
            }else{
                resolve({code:resJson.resCode.success,data,error:""})
            }
        })
    })
}

/**
 * 写文件
 * @param {String} pathName 
 * @param {String | NodeJS.ArrayBufferView} content 
 * @param {fs.WriteFileOptions} options 
 * @returns 
 */
const writeFile = async (pathName:any,content:string,options={})=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(pathName,content,options,(err:any,data:any)=>{
            if (err) {
                resolve({code:resJson.resCode.error,data:"",error:err})
            }else{
                resolve({code:resJson.resCode.success,data,error:""})
            }
        })
    })
}
/**
 * 写文件
 * @param {String} pathName 
 * @param {String | NodeJS.ArrayBufferView} content 
 * @param {fs.WriteFileOptions} options 
 * @returns 
 */
const appendFile = async (pathName:any,content:string,options={})=>{
    return new Promise((resolve,reject)=>{
        fs.appendFile(pathName,content,options,(err:any,data:any)=>{
            if (err) {
                resolve({code:resJson.resCode.error,data:"",error:err})
            }else{
                resolve({code:resJson.resCode.success,data,error:""})
            }
        })
    })
}

/**
 * 判断文件/文件夹的状态
 * @param {String} pathName 
 * @returns 
 */
const stat = async(pathName:string)=>{
    return new Promise((resolve,reject)=>{
        fs.stat(pathName,(err:any,data:any)=>{
            if (err) {
                resolve({code:resJson.resCode.error,data:{size:0},error:err})
            }else{
                resolve({code:resJson.resCode.success,data:data,error:""})
            }
        })
    })
}

/**
 * 创建文件夹
 * @param {String} pathName 
 * @returns 
 */
const mkdir = async(pathName:string)=>{
    return new Promise((resolve,reject)=>{
        pathName = pathName || '';
        let pathList:Array<string> = pathName.split('/');
        let errorList:any = {};
        let currentPath:string = '';
        let errCount:number = 0;
        for(let i in pathList){
            currentPath += `${pathList[i]}/`; // 构造当前路径
            if (!fs.existsSync(currentPath)) { // 判断当前路径是否存在
                let res = fs.mkdirSync(currentPath); // 如果不存在则创建该目录                
                if(res){
                    errCount++;
                    errorList[i] = res;
                }
            }
        }
        if(errCount>0){
            resolve({code:resJson.resCode.error,error:errorList,data:""})
        }else{
            resolve({code:resJson.resCode.success,data:"",error:""})
        }
    })
}

class FsCrypt{
    readdir:(pathName:string)=>Promise<unknown>;
    readFile:(pathName:string)=>Promise<unknown>;
    writeFile:(pathName:string,content:string)=>Promise<unknown>;
    appendFile:(pathName:string,content:string)=>Promise<unknown>;
    stat:(pathName:string)=>Promise<unknown>;
    mkdir:(pathName:string)=>Promise<unknown>;
    constructor(){
        this.readdir = readdir
        this.readFile = readFile
        this.writeFile = writeFile
        this.stat = stat
        this.mkdir = mkdir
        this.appendFile = appendFile
    }

}

export default new FsCrypt();
