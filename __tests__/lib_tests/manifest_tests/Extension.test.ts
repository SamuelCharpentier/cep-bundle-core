import { Extension, ExtensionArgument } from '@manifest/Extension';

describe('Extension', () => {
	it('is defined', () => {
		expect(Extension).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates non-ExtensionArgument argument', () => {
		badArgument = 42;
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), 42 (number) received',
		);
		badArgument = {};
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), \n{}\n (object) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), \n["hello"]\n (array) received',
		);
		badArgument = true;
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), true (boolean) received',
		);
		badArgument = () => {};
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), [Function] (function) received',
		);
	});
	it('Invalidates a bad id type', () => {
		badArgument = { id: 42 };
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: extensions[].id must be provided as a string, 42 (number) received',
		);
	});
	it('Invalidates a bad version type', () => {
		badArgument = { id: 'hello', version: 42 };
		expect(() => {
			new Extension(badArgument);
		}).toThrow(
			'Validation Error: extensions[].version must be provided as a VersionNumber (type), 42 (number) received',
		);
	});
	let validArgument: ExtensionArgument;
	it('validates any ExtensionArgument', () => {
		validArgument = {
			id: 'hello',
		};
		expect(() => {
			new Extension(validArgument);
		}).not.toThrow();
		validArgument = {
			id: 'hello',
			version: '1.0.0',
		};
		expect(() => {
			new Extension(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		validArgument = {
			id: 'hello',
			version: '1.0.0',
			dispatchInfo: {
				ui: {
					menu: {
						menuName: 'hello',
					},
				},
			},
		};
		const extension = new Extension(validArgument);
		expect(extension.xml(['ExtensionList', 'DispatchInfoList'])).toBe(
			`<Extension Id="hello" Version="1.0.0">
	<DispatchInfo>
		<UI>
			<Menu>hello</Menu>
		</UI>
	</DispatchInfo>
</Extension>
`,
		);
		validArgument = {
			id: 'my.extension',
			version: '0.0.1',
			hostList: [
				{ host: 'Illustrator', version: 'ALL', debugPort: '999' },
				{ host: 'InDesign', version: 12, debugPort: '998' },
			],
			dispatchInfo: [
				{
					extensionData: ['This every extensions is awesome'],
					resources: {
						mainPath: './dst/index.html',
						scriptPath: './scripts/main.jsx',
						cefParams: ['--parameter1=value1', '--enable-nodejs'],
					},
					lifecycle: {
						startOn: [
							'applicationActivate',
							'com.adobe.csxs.events.ApplicationActivate',
						],
					},
					ui: {
						type: 'Panel',
						menu: { menuName: 'My awesome extension' },
						geometry: {
							minSize: { width: 200, height: 400 },
						},
						icons: { normal: './icons/normal.jpg' },
					},
				},
				{
					extensionData: ['This DispatchInfo is for InDesign'],
					host: 'InDesign',
				},
			],
			dependencyList: {
				id: 'com.depending.on.this.extension',
				version: '2.1',
			},
		};
		const extension2 = new Extension(validArgument);
		expect(extension2.xml(['DispatchInfoList'])).toBe(
			`<Extension Id="my.extension">
	<HostList>
		<Host Name="ILST"/>
		<Host Name="IDSN"/>
	</HostList>
	<DispatchInfo>
		<Resources>
			<MainPath>./dst/index.html</MainPath>
			<ScriptPath>./scripts/main.jsx</ScriptPath>
			<CEFCommandLine>
				<Parameter>--parameter1=value1</Parameter>
				<Parameter>--enable-nodejs</Parameter>
			</CEFCommandLine>
		</Resources>
		<Lifecycle>
			<StartOn>
				<Event>applicationActivate</Event>
				<Event>com.adobe.csxs.events.ApplicationActivate</Event>
			</StartOn>
		</Lifecycle>
		<UI>
			<Type>Panel</Type>
			<Menu>My awesome extension</Menu>
			<Geometry>
				<MinSize>
					<Width>200</Width>
					<Height>400</Height>
				</MinSize>
			</Geometry>
			<Icons>
				<Icon Type="Normal">./icons/normal.jpg</Icon>
			</Icons>
		</UI>
		<ExtensionData>This every extensions is awesome</ExtensionData>
	</DispatchInfo>
	<DispatchInfo Host="IDSN">
		<ExtensionData>This DispatchInfo is for InDesign</ExtensionData>
	</DispatchInfo>
	<DependencyList>
		<Dependency Id="com.depending.on.this.extension" version="2.1"/>
	</DependencyList>
</Extension>
`,
		);
	});
});
