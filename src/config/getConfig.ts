import { getDefaultConfig } from './getDefaultConfig';
import { getPkgConfig } from './getPkgConfig';
import { getProcessEnvConfig } from './getProcessEnvConfig';

import { removeUndefinedNullAndEmpty } from '../utils';

const validConfigNames: string[] = [
	'out',
	'isDev',
	'devPort',
	'devHost',
	'env',
	'root',
	'htmlFilename',

	'id',
	'version',
	'name',
	'hosts',
	'iconNormal',
	'iconRollover',
	'iconDarkNormal',
	'iconDarkRollover',
	'panelWidth',
	'panelHeight',
	'panelMinWidth',
	'panelMinHeight',
	'panelMaxWidth',
	'panelMaxHeight',
	'debugPorts',
	'debugInProduction',
	'cefParams',
];

export function getConfig(parameterConfig: any) {
	const config = filterOnlyValidConfigs(
		{
			...removeUndefinedNullAndEmpty(getDefaultConfig()),
			...removeUndefinedNullAndEmpty(getPkgConfig(parameterConfig?.root)),
			...removeUndefinedNullAndEmpty(getProcessEnvConfig()),
			...removeUndefinedNullAndEmpty({ ...parameterConfig }),
		},
		validConfigNames,
	);

	config.hosts = parseHosts(config.hosts);
	config.debugPorts = filterDebugPorts(config.debugPorts, config.hosts);
	let extensions = [];
	if (Array.isArray(config.extensions)) {
		extensions = config.extensions.map((extension: any) => {
			return assignDefined({}, config, extension);
		});
	} else {
		extensions.push({
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
function filterOnlyValidConfigs(config: any, validKeys: string[]) {
	let result: { [index: string]: any } = {};

	for (let key in config) {
		if (config.hasOwnProperty(key) && validKeys.includes(key)) {
			result[key] = config[key];
		}
	}
	return result;
}
function filterDebugPorts(debugPorts: { [index: string]: any }, hosts: { name: string }[]) {
	let filteredDebugPorts: { [index: string]: any } = {};
	for (let host of hosts) {
		filteredDebugPorts[host.name] = debugPorts[host.name];
	}
	return filteredDebugPorts;
}
getConfig({ hosts: 'ILST' }); //?
