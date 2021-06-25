export function getProcessEnvConfig(env?: string) {
	let envVarConfig: { [index: string]: any } = getSimpleValues(env);
	envVarConfig.debugPorts = getDebugPorts();
	envVarConfig.debugInProduction = getDebugInProduction();
	envVarConfig.cefParams = getCEFParameters();
	env = env === undefined ? envVarConfig.env : undefined;
	if (env !== undefined && typeof env === 'string') {
		envVarConfig = { ...envVarConfig, ...getProcessEnvConfig(env) };
		delete envVarConfig[env];
		delete envVarConfig[envVarConfig.env];
		delete envVarConfig.env;
	}
	return envVarConfig;
}

function getSimpleValues(env: string = '') {
	const keyNameTable: { [index: string]: any } = {
		NAME: 'name',
		ID: 'id',
		VERSION: 'version',
		ENV: 'env',
		HOSTS: 'hosts',
		ICON_NORMAL: 'iconNormal',
		ICON_ROLLOVER: 'iconRollover',
		ICON_DARK_NORMAL: 'iconDarkNormal',
		ICON_DARK_ROLLOVER: 'iconDarkRollover',
		PANEL_WIDTH: 'panelWidth',
		PANEL_HEIGHT: 'panelHeight',
		PANEL_MIN_WIDTH: 'panelMinWidth',
		PANEL_MIN_HEIGHT: 'panelMinHeight',
		PANEL_MAX_WIDTH: 'panelMaxWidth',
		PANEL_MAX_HEIGHT: 'panelMaxHeight',
		DEV_HOST: 'devHost',
	};
	let stringValues: { [index: string]: any } = {};
	for (const varName in keyNameTable) {
		if (process.env[`CEP_${env !== '' ? env.toUpperCase() + '_' : ''}${varName}`] !== undefined) {
			stringValues[keyNameTable[varName]] =
				process.env[`CEP_${env !== '' ? env.toUpperCase() + '_' : ''}${varName}`];
		}
	}
	return stringValues;
}

function getDebugPorts() {
	const debugPortEnvs: { [index: string]: any } = {};
	for (const envVarName in process.env) {
		let value = process.env[envVarName];
		if (envVarName.indexOf('CEP_DEBUG_PORT_') === 0 && typeof value === 'string' && validatePort(value)) {
			debugPortEnvs[envVarName.replace('CEP_DEBUG_PORT_', '')] = parseInt(value);
		}
	}
	return debugPortEnvs;
}
function validatePort(num: string) {
	const validPortRegex =
		/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi;
	return validPortRegex.test(num);
}
function getDebugInProduction() {
	if (process.env.CEP_DEBUG_IN_PRODUCTION && isTruthy(process.env.CEP_DEBUG_IN_PRODUCTION)) {
	}
}
function isTruthy(str: any) {
	return typeof str === 'string' && (str === '1' || str.toLowerCase() === 'true');
}
function getCEFParameters() {
	if (process.env.CEP_CEF_PARAMS !== undefined && process.env.CEP_CEF_PARAMS.split(',').length > 0)
		return process.env.CEP_CEF_PARAMS.split(',');
}
