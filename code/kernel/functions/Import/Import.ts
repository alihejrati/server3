import * as currentDir from 'current-dir';
import * as fileExists from 'file-exists';
import * as directoryExists from 'directory-exists';

async function Import(path: string, tscFlag: boolean = true): Promise<any> {
    path = `/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/');
    // if (tscFlag) {
        // path = path.replace(/\.ts$/g, '.js');
        // path = `/compile${path}`;
    // }

    path = `${currentDir()}/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/');

    if (fileExists.sync(path)) {
        console.log['kernel/import']({
            level: 'trace',
            path: path
        });
        return import(path); 
    } else {
        console.log['kernel/import']({
            level: 'warn',
            path: path
        });
        return undefined;
    }
}

global.Import = Import;

export default Import;