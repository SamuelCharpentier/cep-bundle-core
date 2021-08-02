import { ExtensionManifest } from './lib/ExtensionManifest';
import { Extension } from './lib/Extension';

console.log(
	'<?xml version="1.0" encoding="UTF-8"?>\n' +
		new ExtensionManifest({
			bundleId: 'my.bundle',
			bundleVersion: '0.0.0.1',
			bundleName: 'Awsome Extensions',
			authorName: 'Samuel Charpentier',
			contact: 'samuel@jaunemoutarde.ca',
			legal: 'https://AwsomeExtensions.com/legal',
			abstract: 'https://AwsomeExtensions.com/legal',
			executionEnvironment: { localeList: ['fr_CA', 'en_US'] },
			extensions: {
				id: 'my.extension',
				version: '9',
				hostList: [
					{ host: 'Illustrator', version: 'ALL' },
					{ host: 'InDesign', version: 12 },
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
						menu: { menuName: 'My Extension' },
						geometry: {
							minSize: { width: 200, height: 200 },
						},
					},
				},
			},
		}).xml(['manifest.xml']),
);
