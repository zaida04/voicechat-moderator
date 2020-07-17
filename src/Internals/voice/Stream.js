class Stream {
	constructor(connection, id) {
		this._connection = connection;
		this._stream = connection.receiver.createStream(id, {
			"mode": "pcm",
			"end": "manual"
		});
		this._member = connection.channel.members.get(id);
	}
	async init() {
		let threshold = (await this.connection.channel.guild.threshold) === "high" ? 2000 : (await this.connection.channel.guild.threshold) === "medium" ? 1750 : 1500;
		let count = 5;
		let muted = false;
		this.stream.on("data", async (data) => {
			if (count !== 0) return count--;
			else count = 5;
			if (muted) return;
			if (Stream.getVolume(data) > threshold) {
				muted = true;
				await this.member.voice.setMute(true);
				this.member.send("You have been muted for `10 Seconds` due to excessive volume coming from your mic. If you did not do this intentionally, please take proper measures to ensure this doesn't happen again.").catch(() => {});
				setTimeout(async () => {
					await this.member.voice.setMute(false);
					muted = false;
				}, 10000);
			}
		});
		return this;
	}
	get connection() {
		return this._connection;
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