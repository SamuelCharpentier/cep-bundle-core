import {
	AdobeLocaleCodes,
	CEPVersion,
	HostEngine,
	UIType,
} from '@src/lib/enumsAndValidators';

import { _UserManifestConfigs } from './UserManifestConfigs';

export let userManifestConfigs: _UserManifestConfigs = {
	extensionBundle: {
		id: 'some.id',
		version: '0.0.0',
		name: 'Some Extension',
		cepVersion: CEPVersion.latest,
	},
	authorName: 'Some Author',
	contact: 'contact@some.com',
	legal: 'https://some.com/legal',
	abstract: 'https://some.com/abstract',
	executionEnvironment: {
		localeList: AdobeLocaleCodes.en_US,
	},
	extensions: {
		id: 'some.id',
		version: '0.0.0',
		hostList: {
			host: HostEngine.Illustrator,
			version: '20.0',
			debugPort: '8080',
		},
		dispatchInfo: {
			resources: {
				htmlFileName: './index.html',
			},
			ui: {
				type: UIType.Panel,
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
	},
};
