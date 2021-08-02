import { ExtensionList } from './lib/ExtensionList';
import { ExtensionManifest, ExtensionManifestArgument, isExtensionManifestArgument } from './lib/ExtensionManifest';
import cepConfig from '../cepConfig.js';

const config = cepConfig;

if (isExtensionManifestArgument(config)) {
	console.log('<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionManifest(config).xml(['manifest.xml']));
	console.log('<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionList(config.extensions).xml(['.debug']));
}
