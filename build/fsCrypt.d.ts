declare class FsCrypt {
    readdir: (pathName: string) => Promise<unknown>;
    readFile: (pathName: string) => Promise<unknown>;
    writeFile: (pathName: string, content: string) => Promise<unknown>;
    appendFile: (pathName: string, content: string) => Promise<unknown>;
    stat: (pathName: string) => Promise<unknown>;
    mkdir: (pathName: string) => Promise<unknown>;
    constructor();
}
declare const _default: FsCrypt;
export default _default;
