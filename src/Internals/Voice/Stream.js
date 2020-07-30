class Stream {
	constructor(connection, id) {
		this._connection = connection;
		this._stream = this.connection.voiceConnection.receiver.createStream(id, {
			"mode": "pcm",
			"end": "manual"
		}); 
		this._member = this.connection.channel.members.get(id);
	}
	async init() {
		const { warnEmbed, punishEmbed } = this.member.client.utilities;
		let threshold = (await this.connection.channel.guild.threshold) === "high" ? 2000 : (await this.connection.channel.guild.threshold) === "medium" ? 1750 : 1500;
		let punishment = await this.connection.channel.guild.punishment;
		let count = 50;
		let muted = false; 
		this.stream.on("data", async (data) => {
			if (muted) return;
			if (count !== 0) return count--;
			else count = 50;
			if (Stream.getVolume(data) > threshold) {
				this.connection.guildConnection.punish(this.member.id, punishment);
				if(this.connection.guildConnection.cases.get(this.member.id).filter(x => x === punishment).length < 2) {
					await this.member.voice.setMute(true);
					setTimeout(async ()=> {
						await this.member.voice.setMute(false);
					}, 10000);
					let notifyChannel = this.member.guild.channels.cache.get(await this.member.guild.notifyChannel);
					if(notifyChannel) {
						notifyChannel.send(new warnEmbed(`A member has been warned for high mic volume.\nPerson: ${this.member.user} (${this.member.id})`));
					}
					return this.member.send(new warnEmbed("You are being given your only warning. Audio of too high of a volume is being outputted from your mic. Please adjust your mic volume/ask others to increase your volume. You will be punished if your volume exceeds the threshold again."));
				}
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
					await this.member.roles.add(this.member.guild.roles.cache.find(x => x.name.toLowerCase() === "muted"));
					break;
				}*/
				}
				let notifyChannel = this.member.guild.channels.cache.get(await this.member.guild.notifyChannel);
				if (notifyChannel) {
					notifyChannel.send(new punishEmbed(`A member has been punished for high mic volume.\nPerson: ${this.member.user} (${this.member.id})\nPunishment: ${punishment}`));
				}
				this.member.send(new punishEmbed(`You have been ${punishment === "vc_mute" ? "`muted for 5 minutes`" : punishment === "vc_kick" ? "`kicked from the voice channel`" : "unknown type"} due to excessive volume coming from your mic. If you did not do this intentionally, please take proper measures to ensure this doesn't happen again. Further punishment may occur if you don't comply.`)).catch(() => {});
				if(punishment === "vc_mute") {
					setTimeout(async () => {
						await this.member.voice.setMute(false);
						muted = false;
					}, 300000);
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