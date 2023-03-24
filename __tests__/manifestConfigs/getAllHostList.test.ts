import { HostEngine, getHostEngineKey } from '@src/lib/enumsAndValidators';
import { getAllHostList } from '@src/userConfigs/ManifesConfigs/convertManifestConfigs/getAllHostList';

describe('getAllHostList', () => {
	it('is defined', () => {
		expect(getAllHostList).toBeDefined();
	});
	it('returns an array of all hosts', () => {
		const hostList = getAllHostList();
		expect(hostList).toBeInstanceOf(Array);
		expect(hostList.length).toBe(Object.keys(HostEngine).length);
		hostList.forEach((host) => {
			expect(host).toHaveProperty('host');
			expect(host).toHaveProperty('version');
			expect(host).toHaveProperty('debugPort');
			expect(HostEngine).toHaveProperty(getHostEngineKey(host.host));
		});
	});
});
