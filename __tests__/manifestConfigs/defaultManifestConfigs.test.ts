import { HostEngine } from '@src/lib/enumsAndValidators';
import { defaultManifestConfigs } from '@src/manifestConfigs/defaultManifestConfigs';

describe('defaultManifestConfigs', () => {
	it('is defined', () => {
		expect(defaultManifestConfigs).toBeDefined();
	});
	it('has a debugPorts property for each HostEngine', () => {
		expect(defaultManifestConfigs).toHaveProperty('debugPorts');
		expect(defaultManifestConfigs.debugPorts).toBeInstanceOf(Object);
		Object.keys(HostEngine).forEach((host) => {
			expect(defaultManifestConfigs.debugPorts).toHaveProperty(host);
		});
	});
});
