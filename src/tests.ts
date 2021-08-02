import { ExtensionList } from './lib/ExtensionList';
import { ExtensionManifest, ExtensionManifestArgument } from './lib/ExtensionManifest';

const config: ExtensionManifestArgument = {
	bundleId: 'my.bundle',
	bundleVersion: '0.0.0.1',
	bundleName: 'Awsome Extensions',
	authorName: 'Samuel Charpentier',
	contact: 'samuel@jaunemoutarde.ca',
	legal: 'https://AwsomeExtensions.com/legal',
	abstract: 'https://AwsomeExtensions.com/legal',
	executionEnvironment: {
		localeList: ['fr_CA', 'en_US'],
	},
	extensions: {
		id: 'my.extension',
		version: '9',
		hostList: [
			{ host: 'Illustrator', version: 'ALL', debugPort: '999' },
			{ host: 'InDesign', version: 12, debugPort: '998' },
		],
		dispatchInfo: {
			resources: {
				mainPath: './dst/index.html',
				scriptPath: './scripts/main.jsx',
				cefCommands: ['--parameter1=value1', '--enable-nodejs'],
			},
			lifecycle: {
				startOn: ['applicationActivate', 'com.adobe.csxs.events.ApplicationActivate'],
			},
			ui: {
				type: 'Panel',
				menu: { menuName: 'My awesome extension' },
				geometry: {
					minSize: { width: 200, height: 400 },
				},
				icons: { Normal: './icons/normal.jpg' },
			},
		},
	},
};

console.log('<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionManifest(config).xml(['manifest.xml']));
console.log('<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionList(config.extensions).xml(['.debug']));
