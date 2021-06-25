export function getDefaultConfig() {
	return {
		out: './dist',
		hosts: '*',
		env: process.env.NODE_ENV,
		debugInProduction: false,
		cepVersion: '8.0',
		lifecycle: {
			autoVisible: true,
			startOnEvents: [],
		},
		cefParams: ['--allow-file-access-from-files', '--allow-file-access', '--enable-nodejs', '--mixed-context'],
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
			MUST: 3011,
			KBRG: 3012,
		},
		root: process.cwd(),
	};
}
