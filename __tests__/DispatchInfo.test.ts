import { DispatchInfo, DispatchInfoArgument } from '@manifest/DispatchInfo';

describe('DispatchInfo', () => {
	it('Is defined', () => {
		expect(DispatchInfo).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new DispatchInfo(badArgument);
		}).toThrow(
			'Validation Error: dispatchInfo must be provided as a DispatchInfoArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates non-DispatchInfoArgument argument', () => {
		badArgument = 42;
		expect(() => {
			new DispatchInfo(badArgument);
		}).toThrow(
			'Validation Error: dispatchInfo must be provided as a DispatchInfoArgument (type), 42 (number) received',
		);
		badArgument = {};
		expect(() => {
			new DispatchInfo(badArgument);
		}).toThrow(
			'Validation Error: dispatchInfo must be provided as a DispatchInfoArgument (type), \n{}\n (object) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new DispatchInfo(badArgument);
		}).toThrow(
			'Validation Error: dispatchInfo must be provided as a DispatchInfoArgument (type), \n["hello"]\n (array) received',
		);
		badArgument = true;
		expect(() => {
			new DispatchInfo(badArgument);
		}).toThrow(
			'Validation Error: dispatchInfo must be provided as a DispatchInfoArgument (type), true (boolean) received',
		);
		badArgument = () => {};
		expect(() => {
			new DispatchInfo(badArgument);
		}).toThrow(
			'Validation Error: dispatchInfo must be provided as a DispatchInfoArgument (type), [Function] (function) received',
		);
	});
	it('Invalidates bad host value', () => {
		badArgument = { extensionData: ['This DispatchInfo is for InDesign'], host: 'hello' };
		expect(() => {
			new DispatchInfo(badArgument);
		}).toThrow(
			"Validation Error: dispatchInfo.host must be provided as a HostEngine(ENUM) key or value, 'hello' (string) received",
		);
	});
	let validArgument: DispatchInfoArgument;
	it('validates any DispatchInfoArgument', () => {
		validArgument = {
			extensionData: 'This DispatchInfo is for InDesign',
			host: 'IDSN',
		};
		expect(() => {
			new DispatchInfo(validArgument);
		}).not.toThrow();
		validArgument = {
			extensionData: ['This extension is awesome'],
			resources: {
				mainPath: './dst/index.html',
				scriptPath: './scripts/main.jsx',
				cefParams: ['--parameter1=value1', '--enable-nodejs'],
			},
			lifecycle: {
				startOn: ['applicationActivate', 'com.adobe.csxs.events.ApplicationActivate'],
			},
			ui: {
				type: 'Panel',
				menu: { menuName: 'My awesome extension' },
				geometry: {
					minSize: { width: 200, height: 400 },
				},
				icons: { normal: './icons/normal.jpg' },
			},
		};
		expect(() => {
			new DispatchInfo(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		validArgument = {
			extensionData: ['This DispatchInfo is for InDesign'],
			host: 'InDesign',
		};
		const dispatchInfo = new DispatchInfo(validArgument);
		expect(dispatchInfo.xml(['DispatchInfoList'])).toBe(
			'<DispatchInfo Host="IDSN">\n\t<ExtensionData>This DispatchInfo is for InDesign</ExtensionData>\n</DispatchInfo>\n',
		);
		validArgument = {
			extensionData: ['This extension is awesome'],
			resources: {
				mainPath: './dst/index.html',
				scriptPath: './scripts/main.jsx',
				cefParams: ['--parameter1=value1', '--enable-nodejs'],
			},
			lifecycle: {
				startOn: ['applicationActivate', 'com.adobe.csxs.events.ApplicationActivate'],
			},
			ui: {
				type: 'Panel',
				menu: { menuName: 'My awesome extension' },
				geometry: {
					minSize: { width: 200, height: 400 },
				},
				icons: { normal: './icons/normal.jpg' },
			},
		};
		const dispatchInfo2 = new DispatchInfo(validArgument);
		expect(dispatchInfo2.xml(['DispatchInfoList'])).toBe(
			'<DispatchInfo>\n\t<Resources>\n\t\t<MainPath>./dst/index.html</MainPath>\n\t\t<ScriptPath>./scripts/main.jsx</ScriptPath>\n\t\t<CEFCommandLine>\n\t\t\t<Parameter>--parameter1=value1</Parameter>\n\t\t\t<Parameter>--enable-nodejs</Parameter>\n\t\t</CEFCommandLine>\n\t</Resources>\n\t<Lifecycle>\n\t\t<StartOn>\n\t\t\t<Event>applicationActivate</Event>\n\t\t\t<Event>com.adobe.csxs.events.ApplicationActivate</Event>\n\t\t</StartOn>\n\t</Lifecycle>\n\t<UI>\n\t\t<Type>Panel</Type>\n\t\t<Menu>My awesome extension</Menu>\n\t\t<Geometry>\n\t\t\t<MinSize>\n\t\t\t\t<Width>200</Width>\n\t\t\t\t<Height>400</Height>\n\t\t\t</MinSize>\n\t\t</Geometry>\n\t\t<Icons>\n\t\t\t<Icon Type="Normal">./icons/normal.jpg</Icon>\n\t\t</Icons>\n\t</UI>\n\t<ExtensionData>This extension is awesome</ExtensionData>\n</DispatchInfo>\n',
		);
	});
});
