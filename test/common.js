
const mainJs = require('../build/main');
let folder = 'logs/logs';

const logsFun = new mainJs.Logger()
const getData  = async ()=>{
    logsFun.init({
        folder:folder,
        maxSize:1000,
        openConsole:false,
        useDateFolder:true,
        dateFolderType:mainJs.DateList.type.day,
        level:mainJs.LevelsType.ERROR,
    })
    logsFun.addLogs({
        text:'1111111111111111111\n',
        text2:'2222222222222222222\n',
        text3:'3333333333333333333\n',
        text4:'4444444444444444444\n',
        text5:'5444444444444444444\n',
        text6:'6444444444444444444\n',
        text7:'7444444444444444444\n',
        text8:'8444444444444444444\n',
        time:"2023-01-01 12:05"
    })
}

getData();
