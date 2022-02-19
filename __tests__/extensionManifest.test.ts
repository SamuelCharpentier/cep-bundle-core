import { ExtensionManifest } from '@manifest/ExtensionManifest';
import cepConfig from './.cep.config.js';

const manifestConfig = { ...cepConfig.manifest, extensions: cepConfig.extensions };
describe('Extension Manifest', () => {
	it('Is defined', () => {
		expect(ExtensionManifest).toBeDefined();
	});
	/* 
	it('Generates xml', () => {
		let extensionManifest = new ExtensionManifest(manifestConfig);
		let manifestXML = extensionManifest.xml(['manifest.xml']);
		expect(manifestXML).not.toBe('');
		expect(typeof manifestXML).toBe('string');
		expect(manifestXML).toMatch(/^<ExtensionManifest/);
		expect(manifestXML).toMatch(/<\/ExtensionManifest>$/m);
		console.log(manifestXML);
	}); */
});
