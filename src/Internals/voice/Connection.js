const Stream = require("./Stream");

class Connection {
	constructor(data) {
		this._guild = data.guild;
		this._connection = data.connection;
		this._member = data.member;
		this._channel = data.channel;
		this._stream = (new Stream(data.connection, data.member.id)).init();
	}
	get guild() {
		return this._guild;
	}
	get channel() {
		return this._channel;
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
}

module.exports = Connection;