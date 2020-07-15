class Stream {
	constructor(connection, id) {
		this._stream = connection.receiver.createStream(id, {
			"mode": "pcm",
			"end": "manual"
		});
		this._member = connection.channel.members.get(id);
		let threshold = connection.client.settings.decibel === "high" ? 2000 : connection.client.settings.decibel === "medium" ? 1750 : 1500;
		let count = 15;
		this.stream.on("data", async (data) => {
			if (count !== 0) return count--;
			else count = 15;
			if (Stream.getVolume(data) > threshold) {
				await this.member.voice.setMute(true);
				connection.channel.guild.channels.cache.filter(x => x.type === "text").random().send(`${this.member}, you have been muted for being too loud. You will be unmuted in \`5 seconds\`.`);
				setTimeout(async() => {
					await this.member.voice.setMute(false);
				}, 5000);
			}
		});
	}
	get member() {
		return this._member;
	}
	get stream() {
		return this._stream;
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