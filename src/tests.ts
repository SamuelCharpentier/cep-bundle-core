import { ExtensionList, isExtensionListArgument } from './lib/ExtensionList';
import { ExtensionManifest, ExtensionManifestArgument, isExtensionManifestArgument } from './lib/ExtensionManifest';
import cepConfig from '../cepConfig.js';

const config = cepConfig;
const manifestConfig = { ...config.manifest, extensions: config.extensions };
if (isExtensionManifestArgument(manifestConfig)) {
	console.log(
		'<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionManifest(manifestConfig).xml(['manifest.xml']),
	);
}
if (isExtensionListArgument(config.extensions))
	console.log('<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionList(config.extensions).xml(['.debug']));
