export function getPkgConfig(pkg: any, env?: string) {
	const pkgConfig = pkg.hasOwnProperty('cep') ? (env && pkg.cep.hasOwnProperty(env) ? pkg.cep[env] : pkg.cep) : {};
	return {
		bundleName: pkgConfig.name,
		bundleId: pkgConfig.id,
		bundleVersion: pkgConfig.version,
		cepVersion: pkgConfig.cepVersion,
		hosts: pkgConfig.hosts,
		iconNormal: pkgConfig.iconNormal,
		iconRollover: pkgConfig.iconRollover,
		iconDarkNormal: pkgConfig.iconDarkNormal,
		iconDarkRollover: pkgConfig.iconDarkRollover,
		panelWidth: pkgConfig.panelWidth,
		panelHeight: pkgConfig.panelHeight,
		panelMinWidth: pkgConfig.panelMinWidth,
		panelMinHeight: pkgConfig.panelMinHeight,
		panelMaxWidth: pkgConfig.panelMaxWidth,
		panelMaxHeight: pkgConfig.panelMaxHeight,
		debugPorts: pkgConfig.debugPorts,
		debugInProduction: pkgConfig.debugInProduction,
		lifecycle: pkgConfig.lifecycle,
		cefParams: pkgConfig.cefParams,
		htmlFilename: pkgConfig.htmlFilename,
		extensions: pkgConfig.extensions,
		devHost: pkgConfig.devHost,
		devPort: pkgConfig.devPort,
	};
}
