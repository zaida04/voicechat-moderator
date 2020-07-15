class Stream {
	constructor(connection, id) {
		this._stream = connection.receiver.createStream(id, {
			"mode": "pcm",
			"end": "manual"
		});
		let count = 25;
		this.stream.on("data", async (data) => {
			if (count !== 0) return count--;
			else count = 75;
			if (Stream.getVolume(data) > 1000) {
				await connection.channel.members.get(id).voice.setMute(true);
			}
		});
	}
	static getVolume(buffer) {
		let total = 0;
		let notn = [];
		for (let i = 0; i < buffer.length / 2; i += 2) {
			let uint = Math.floor(buffer.readInt16LE(i));
			notn.push(uint);
			total++;
		}

		for (let i = 0; i < notn.length; i++) {
			total += notn[i];
		}

		return Math.abs(total / notn.length);
	}
}

module.exports = Stream;