import { getDefaultConfig } from './getDefaultConfig';
import { getPkgConfig } from './getPkgConfig';
import { getEnvConfig as getProcessEnvConfig } from './getProcessEnvConfig';

export function getConfig(pkg: any, env?: string) {
	const config = { ...getDefaultConfig(), ...getPkgConfig(pkg), ...getProcessEnvConfig() };

	config.hosts = parseHosts(config.hosts);
	let extensions = [];
	if (Array.isArray(config.extensions)) {
		extensions = config.extensions.map((extension: any) => {
			return assignDefined({}, config, extension);
		});
	} else {
		extensions.push({
			id: config.bundleId,
			name: config.bundleName,
			...config,
		});
	}
	config.extensions = extensions;
	return config;
}

function assignDefined(target: any, ...sources: any) {
	for (const source of sources) {
		for (const key of Object.keys(source)) {
			const val = source[key];
			if (val !== undefined) {
				target[key] = val;
			}
		}
	}
	return target;
}

export function parseHosts(hostsString: string) {
	if (hostsString == '*') hostsString = `PHXS, IDSN, AICY, ILST, PPRO, PRLD, AEFT, FLPR, AUDT, DRWV, MUST, KBRG`;
	const hosts = hostsString
		.split(/(?![^)(]*\([^)(]*?\)\)),(?![^\[]*\])/)
		.map((host) => host.trim())
		.map((host) => {
			// @ts-ignore
			let [name, version] = host.split('@');
			if (version == '*' || !version) {
				version = '[0.0,99.9]';
			} else if (version) {
				version = version;
			}
			return {
				name,
				version,
			};
		});
	return hosts;
}
