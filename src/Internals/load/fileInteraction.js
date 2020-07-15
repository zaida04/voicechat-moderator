const fs = require("fs");
const { promisify } = require("util");

module.exports = {
	"readdir": promisify(fs.readdir),
	"writeFile": promisify(fs.writeFile),
	"readFile": promisify(fs.readFile),
	"writeFileSync": fs.writeFileSync
};