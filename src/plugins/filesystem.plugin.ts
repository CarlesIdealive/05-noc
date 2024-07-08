import fs from 'fs'

const existsSync = ( path: string): boolean =>
{
    return fs.existsSync(path);
};


module.exports = {
    existsSync
}