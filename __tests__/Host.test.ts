import { HostList } from '@manifest/Host';

describe('HostList', () => {
	it('Validates its argument', () => {
		let parameters: any;
		expect(() => {
			new HostList(parameters);
		}).toThrow(`hostList must be provided as HostListArgument (type), undefined (undefined) received`);
		parameters = {};
		expect(() => {
			new HostList(parameters);
		}).toThrow(`hostList must be provided as HostListArgument (type), undefined (undefined) received`);
	});
});
