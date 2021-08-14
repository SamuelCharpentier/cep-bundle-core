export function getDefaultConfig() {
	return {
		outputFolder: './dist',
		root: process.cwd(),
		debugInProduction: false,
		extensionBundle: { cepVersion: '8.0' },
		extension: {
			hostList: 'All',
			dispatchInfo: {
				lifecycle: {
					autoVisible: true,
				},
			},
		},
	};
}

export const defaultDebugPorts = {
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
	MUST: 3011,
	KBRG: 3012,
};
