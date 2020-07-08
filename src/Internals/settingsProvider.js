const {
	readFile,
	writeFileSync
} = require("./fileInteraction");

class settingsProvider {
	constructor() {
		this.settings_path = `${__dirname}/../../settings.json`;
	}
	async init() {
		let temp = JSON.parse(await readFile(this.settings_path));
		this._prefix = temp.prefix;
		this._punishment = temp.punishment;
		this._decibel = temp.decibel;
		Object.defineProperties(this, {
			"prefix": {
				set: (prefix) => {
					this._prefix = prefix;
					writeFileSync(this.settings_path, JSON.stringify(this.toJSON()));
				},
				get: () => {
					return this._prefix;
				}
			},
			"punishment": {
				set: (punishment) => {
					this._punishment = punishment;
					writeFileSync(this.settings_path, JSON.stringify(this.toJSON()));
				},
				get: () => {
					return this._punishment;
				}
			},
			"decibel": {
				set: (decibel) => {
					this._decibel = decibel;
					writeFileSync(this.settings_path, JSON.stringify(this.toJSON()));
				},
				get: () => {
					return this._decibel;
				}
			}
		});
		return this;
	}
	toJSON() {
		return {
			"prefix": this._prefix,
			"punishment": this._punishment,
			"decibel": this._decibel
		};
	}
}

module.exports = settingsProvider;