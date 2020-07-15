

module.exports = async (oldState, newState) => {
	let vc = oldState.member.client.connections.guilds.get(oldState.guild.id);
	/*if (vc) {
		if ((newState.channel && newState.channel.id === vc.vc) || (oldState.channel && oldState.channel.id === vc.vc)) {
			if (!oldState.channel && newState.channel) {
				newState.member.client.connections.set(oldState.guild.id, vc.members.push(newState.member.id));
				return new userStream(newState.connection, newState.member);
			}
			if (oldState.channel && !newState.channel) {
				if (oldState.channel.members.size === 1 && oldState.channel.members.first().id === oldState.member.client.user.id)
					return oldState.guild.me.voice.connection.disconnect();
			} else {
				return newState.member.client.connections.set(oldState.guild.id, {
					"vc": oldState.channel.id,
					"members": vc.members.filter(x => x !== newState.member.id)
				});
			}
		}
		if (oldState.member.id === oldState.member.client.id && oldState.channel && !newState.channel) {
			return newState.member.client.connections.delete(oldState.guild.id);
		}
	}*/
};