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
				this.member.send("You have been muted for `10 Seconds` due to excessive volume coming from your mic. If you did not do this intentionally, please take proper measures to ensure this doesn't happen again.").catch(() => {});
				setTimeout(async () => {
					await this.member.voice.setMute(false);
				}, 10000);
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
		for (let i = 0; i < buffer.length / 2; i += 2) {
			let uint = Math.floor(buffer.readInt16LE(i));
			total += uint;
		}
		return Math.abs(total / Math.ceil(buffer.length / 4));
	}
}

module.exports = Stream;