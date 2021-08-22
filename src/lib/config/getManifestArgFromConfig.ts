export function getManifestArgFromConfig(config: any) {
	return { ...config.manifest, extensions: config.extensions };
}
