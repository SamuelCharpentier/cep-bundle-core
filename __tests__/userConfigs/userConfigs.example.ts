import {
	AdobeLocaleCodes,
	CEPVersion,
	HostEngine,
	UIType,
} from '@src/lib/enumsAndValidators';
import { RelativePath } from '@src/lib/typesAndValidators';

import { UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';
import { isWidthHeight } from '@src/userConfigs/WidthHeight';

export let exampleUserManifestConfigs: UserManifestConfigs = {
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
			lifecycle: { startOn: 'some starting event?' },
			resources: {
				htmlPath: './index.html',
				scriptPath: './scripts/main.jsx',
				cefParams: '--some-command="Hello"',
			},
			ui: {
				type: UIType.Panel,
				menu: {
					menuName: 'Some Menu',
					placement: 'somewhere?',
				},
				geometry: {
					size: {
						width: '100',
						height: '100',
					},
					screenPercentage: { width: '30', height: '30' },
					minSize: {
						width: '100',
						height: '100',
					},
					maxSize: {
						width: '400',
						height: '400',
					},
				},
			},
		},
		dependencyList: {
			id: 'some.dependency',
			version: '3.4',
		},
	},
};
