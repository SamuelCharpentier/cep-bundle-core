import { HostEngine } from '@src/lib/enumsAndValidators';

export type DefaultManifestConfigs = {
	debugPorts: {
		[key in HostEngine]: number;
	};
};

export const defaultManifestConfigs: DefaultManifestConfigs = {
	debugPorts: {
		PHXS: 3001,
		IDSN: 3002,
		AICY: 3003,
		ILST: 3004,
		PPRO: 3005,
		PRLD: 3006,
		AEFT: 3007,
		FLPR: 3008,
		AUDT: 3009,
		DRWV: 3010,
		MUSE: 3011,
		KBRG: 3012,
	},
};
