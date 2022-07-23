import {
	DispatchInfoList,
	DispatchInfoListArgument,
} from '@manifest/DispatchInfoList';

describe('DispatchInfoList', () => {
	it('should be defined', () => {
		expect(DispatchInfoList).toBeDefined();
	});
	// This element is a container element with no specific attributes. Therefore the following (functional) tests are not necessary because the items it contains should be validating its content.
	let validArgument: DispatchInfoListArgument;
	it('Generates xml', () => {
		validArgument = {
			id: 'my.extension',
			version: '0.0.1',
			hostList: [
				{ host: 'Illustrator', version: 'ALL', debugPort: '999' },
				{ host: 'InDesign', version: 12, debugPort: '998' },
			],
		};
		let extensionList = new DispatchInfoList(validArgument);
		let debugXML = extensionList.xml(['.debug']);
		expect(debugXML).toBe('');

		let manifestXML = extensionList.xml(['manifest.xml']);
		expect(manifestXML).not.toBe('');
		expect(typeof manifestXML).toBe('string');
		expect(manifestXML).toBe(`<DispatchInfoList>
	<Extension Id="my.extension">
		<HostList>
			<Host Name="ILST"/>
			<Host Name="IDSN"/>
		</HostList>
	</Extension>
</DispatchInfoList>
`);
		validArgument = [
			{
				id: 'my.extension',
				version: '0.0.1',
				hostList: [
					{ host: 'Illustrator', version: 'ALL', debugPort: '999' },
					{ host: 'InDesign', version: 12, debugPort: '998' },
				],
			},
			{
				id: 'my.extension.other.extension',
				version: '0.0.1',
				hostList: [
					{ host: 'After Effects', version: 'ALL', debugPort: '997' },
					{ host: 'InDesign', version: 12, debugPort: '996' },
				],
			},
		];
		extensionList = new DispatchInfoList(validArgument);
		debugXML = extensionList.xml(['.debug']);
		expect(debugXML).toBe('');
		manifestXML = extensionList.xml(['manifest.xml']);
		expect(manifestXML).not.toBe('');
		expect(typeof manifestXML).toBe('string');
		expect(manifestXML).toBe(`<DispatchInfoList>
	<Extension Id="my.extension">
		<HostList>
			<Host Name="ILST"/>
			<Host Name="IDSN"/>
		</HostList>
	</Extension>
	<Extension Id="my.extension.other.extension">
		<HostList>
			<Host Name="AEFT"/>
			<Host Name="IDSN"/>
		</HostList>
	</Extension>
</DispatchInfoList>
`);
	});
});
