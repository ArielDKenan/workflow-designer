var fs = require('fs');
var chalk = require('chalk');

module.exports = {
	options: {
		debug: true,
		func: {
			list: ['i18next.t', 'i18n.t'],
			extensions: ['.js', '.jsx']
		},
		removeUnusedKeys: true,
		sort : true,
		trans: {
			extensions: ['.js', '.jsx'],
			fallbackKey: (ns, value) => {
				return value;
			}
		},
		lngs: ['en'],
		defaultNs: 'resource',
		defaultLng: 'en',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			loadPath: 'i18n/{{ns}}_{{lng}}.json',
			savePath: 'i18n/{{ns}}_{{lng}}.json'
		},
		nsSeparator: true, // namespace separator
		keySeparator: true, // key separator
		interpolation: {
			prefix: '{{',
			suffix: '}}'
		}
	},
	transform: function customTransform(file, enc, done) {
		"use strict";
		const parser = this.parser;
		const content = fs.readFileSync(file.path, enc);
		let count = 0;

		parser.parseFuncFromString(content, {list: ['i18next._', 'i18next.__']}, (key, options) => {
			parser.set(key, Object.assign({}, options, {
				nsSeparator: true,
				keySeparator: true
			}));
			++count;
		});

		if (count > 0) {
			console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
		}

		done();
	}
};
