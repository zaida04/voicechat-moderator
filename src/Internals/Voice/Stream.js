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
		let punishment = await this.connection.channel.guild.punishment;
		let count = 5;
		let muted = false; 
		this.stream.on("data", async (data) => {
			if (count !== 0) return count--;
			else count = 5;
			if (muted) return;
			if (Stream.getVolume(data) > threshold) {
				switch (punishment) {
				case "vc_mute": {
					muted = true;
					await this.member.voice.setMute(true);
					break;
				}
				case "vc_kick": {
					await this.member.voice.setChannel(null);
					break;
				}
				/*
				case "g_kick": {
					await this.member.kick("Kicked for exceeding threshold.");
					break;
				}
				case "g_ban": {
					await this.member.ban("Banned for exceeding threshold.");
					break;
				}
				case "g_mute": {
					break;
				}*/
				}
				this.member.send(`You have been ${punishment === "vc_mute" ? "`muted for 10 seconds`" : punishment === "vc_kick" ? "`kicked from the voice channel`" : "unknown type"} due to excessive volume coming from your mic. If you did not do this intentionally, please take proper measures to ensure this doesn't happen again. Further punishment may occur if you don't comply.`).catch(() => {});
				if(punishment === "vc_mute") {
					setTimeout(async () => {
						await this.member.voice.setMute(false);
						muted = false;
					}, 10000);
				}
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