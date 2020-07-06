const fs = require("fs");
const { promisify } = require("util");

module.exports = {
	"readdir": promisify(fs.readdir)
};