import { ExtensionList } from '@manifest/ExtensionList';
import cepConfig from './.cep.config.js';

describe('Extension List', () => {
	it('should be defined', () => {
		expect(ExtensionList).toBeDefined();
	});
	it('Generates xml', () => {
		let extensionList = new ExtensionList(cepConfig.extensions);
		let debugXML = extensionList.xml(['.debug']);
		expect(debugXML).not.toBe('');
		expect(typeof debugXML).toBe('string');
		expect(debugXML).toMatch(/^<ExtensionList>/);
		expect(debugXML).toMatch(/<\/ExtensionList>$/m);
		console.log(debugXML);
	});
});
