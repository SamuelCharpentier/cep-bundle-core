module.exports = {
	manifest: {
		extensionBundle: {
			id: 'some.id',
			version: '0.0.0',
			name: 'Some Extension',
			cepVersion: 'latest',
		},
		authorName: 'Some Author',
		contact: 'contact@some.com',
		legal: 'https://some.com/legal',
		abstract: 'https://some.com/abstract',
		executionEnvironment: {
			localeList: 'en_US',
		},
		extensions: {
			id: 'some.id',
			version: '0.0.0',
			hostList: {
				host: 'Illustrator',
				version: '20.0',
				debugPort: '8080',
			},
			dispatchInfo: {
				resources: {
					htmlPath: './index.html',
				},
				ui: {
					type: 'Panel',
					menu: {
						menuName: 'Some Menu',
					},
					geometry: {
						size: {
							width: '100',
							height: '100',
						},
					},
				},
			},
			dependencyList: {
				id: 'my.dependency',
				version: '0.0.1',
			},
		},
	},
};
