const {
	readdir
} = require("./fileInteraction");

module.exports = async client => {
	try {
		let events = await readdir(`${__dirname}/../events`);
		events.forEach(event => {
			if (!event.endsWith(".js")) return;
			const evt = require(`../events/${event}`);
			let evtName = event.split(".")[0];
			console.log(`Loaded ${evtName}.js`);
			client.on(evtName, evt.bind(null));
		});
	} catch (e) {
		console.log(`An error occured while loading in the events. Process terminated. ${e}`);
	}
};