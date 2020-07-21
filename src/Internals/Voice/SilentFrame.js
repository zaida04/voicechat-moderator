const { Readable } = require("stream");

const SILENCE_FRAME = Buffer.from([0xF8, 0xFF, 0xFE]);

class SilentFrame extends Readable {
	_read() {
		this.push(SILENCE_FRAME);
		this.destroy();
	}
}
 
module.exports = SilentFrame;