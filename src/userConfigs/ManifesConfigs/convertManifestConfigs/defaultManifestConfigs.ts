import { AdobeLocaleCodes, HostEngine } from '@src/lib/enumsAndValidators';

export type DefaultManifestConfigs = {
	debugPorts: {
		[key in keyof typeof HostEngine]: number;
	};
	executionEnvironment: {
		localeList: AdobeLocaleCodes;
	};
};

export const defaultManifestConfigs: DefaultManifestConfigs = {
	debugPorts: {
		Photoshop: 3001,
		InDesign: 3002,
		InCopy: 3003,
		Illustrator: 3004,
		'Premiere Pro': 3005,
		Prelude: 3006,
		'After Effects': 3007,
		'Animate (Flash Pro)': 3008,
		Audition: 3009,
		Dreamweaver: 3010,
		Muse: 3011,
		Bridge: 3012,
	},
	executionEnvironment: {
		localeList: AdobeLocaleCodes.All,
	},
};
