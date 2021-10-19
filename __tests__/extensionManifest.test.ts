import { ExtensionList, isExtensionListArgument } from '@manifest/ExtensionList';
import { ExtensionManifest, ExtensionManifestArgument, isExtensionManifestArgument } from '@manifest/ExtensionManifest';
import cepConfig from './.cep.config.js';

/* const config = cepConfig; */

/* if (isExtensionManifestArgument(manifestConfig)) {
	console.log(
		'<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionManifest(manifestConfig).xml(['manifest.xml']),
	);
}
if (isExtensionListArgument(config.extensions))
	console.log('<?xml version="1.0" encoding="UTF-8"?>\n' + new ExtensionList(config.extensions).xml(['.debug'])); */

const manifestConfig = { ...cepConfig.manifest, extensions: cepConfig.extensions };
describe('Extension Manifest', () => {
	it('Generates xml', () => {
		let extensionManifest = new ExtensionManifest(manifestConfig);
		expect(extensionManifest.xml(['manifest.xml'])).not.toBe('');
	});
});
