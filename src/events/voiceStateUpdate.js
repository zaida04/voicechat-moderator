
module.exports = async (oldState, newState) => {
	let active = oldState.guild.activeVoice;
	if(active) {
		if ((oldState.channel && oldState.channel.id === oldState.guild.activeVoice.id) && (!newState.channel)) {
			if(oldState.member.user.id === oldState.client.user.id) {
				oldState.client.connections.delete(oldState.guild);
			}
			if(oldState.channel.members.filter(x => !x.bot).size === 1 && oldState.channel.members.first().id === oldState.member.client.user.id) {
				return await oldState.guild.me.voice.connection.disconnect();
			}
		}
		if (!oldState.member.user.bot && !oldState.channel && (newState.channel && newState.channel.id === newState.guild.activeVoice.id)) {
			newState.guild.activeConnection.add(newState.member);
		}
	}
};
