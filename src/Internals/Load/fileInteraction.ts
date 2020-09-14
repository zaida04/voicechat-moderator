import fs from "fs";
import { promisify } from "util";
const readdir: Function = promisify(fs.readdir);
const writeFile: Function = promisify(fs.writeFile);
const readFile: Function = promisify(fs.readFile);
const writeFileSync: Function = fs.writeFileSync;
export default { readdir, writeFile, readFile, writeFileSync };
