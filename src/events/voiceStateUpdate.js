
/*
module.exports = async (oldState, newState) => {
	let vc = oldState.guild.activeVoice;
	if (vc) {
		if ((newState.channel && newState.channel.id === vc.vc) || (oldState.channel && oldState.channel.id === vc.vc)) {
			if (!oldState.channel && newState.channel) {
				//person joins
			}
			if (oldState.channel && !newState.channel) {
				if (oldState.channel.members.size === 1 && oldState.channel.members.first().id === oldState.member.client.user.id)
					//person leaves
			} else {
				//no one but bot in channel
			}
		}
		if (oldState.member.id === oldState.member.client.id && oldState.channel && !newState.channel) {
			//bot leaves
		}
	}
};
*/