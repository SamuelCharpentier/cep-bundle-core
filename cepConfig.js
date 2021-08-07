export default {
	manifest: {
		extensionBundle: {
			id: 'my.bundle',
			version: '0.0.0.1',
			name: 'Awsome Extensions Bundle',
			cepVersion: '8.0',
		},
		authorName: 'Samuel Charpentier',
		contact: 'samuel@jaunemoutarde.ca',
		legal: 'https://AwsomeExtensions.com/legal',
		abstract: 'https://AwsomeExtensions.com/legal',
		executionEnvironment: {
			localeList: ['fr_CA', 'en_US'],
		},
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
				cefParams: ['--parameter1=value1', '--enable-nodejs'],
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
