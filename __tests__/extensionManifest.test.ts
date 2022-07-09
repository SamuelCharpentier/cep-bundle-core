import {
	ExtensionManifest,
	BundleInfos,
	ExtensionManifestArgument,
} from '@manifest/ExtensionManifest';
import cepConfig from './.cep.config.js';

describe('Extension Manifest', () => {
	it('Is defined', () => {
		expect(ExtensionManifest).toBeDefined();
	});
	var badArgument: any;
	it('Invalidates an empty argument', () => {
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), undefined (undefined) received',
		);
		badArgument = '';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), '' (string) received",
		);
		badArgument = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), \n[]\n (array) received',
		);
		badArgument = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), \n{}\n (object) received',
		);
	});
	it('invalidates a bad argument', () => {
		badArgument = 'hello';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), 'hello' (string) received",
		);
		badArgument = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), 42 (number) received',
		);
		badArgument = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), true (boolean) received',
		);
		badArgument = ['hello'];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: ExtensionManifestArgument, .cep.config.js must be provided as a ExtensionManifestArgument (type), \n["hello"]\n (array) received',
		);
	});
	const validEntensionBundle: BundleInfos | any =
		cepConfig.manifest.extensionBundle;
	it('invalidates an object without a valid extensionBundle', () => {
		badArgument = { hello: 'world' };
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle must be provided as BundleInfos (type), undefined (undefined) received',
		);
		badArgument = { extensionBundle: 'hello' };
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: extensionBundle must be provided as BundleInfos (type), 'hello' (string) received",
		);
		badArgument = { extensionBundle: [] };
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle must be provided as BundleInfos (type), \n[]\n (array) received',
		);
		badArgument = { extensionBundle: {} };
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle must be provided as BundleInfos (type), \n{}\n (object) received',
		);
		badArgument = { extensionBundle: { ...validEntensionBundle } };
		badArgument.extensionBundle.name = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's name (optional) must be provided as a string, true (boolean) received",
		);
		badArgument.extensionBundle.name = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's name (optional) must be provided as a string, 42 (number) received",
		);
		badArgument.extensionBundle.name = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's name (optional) must be provided as a string, \n[]\n (array) received",
		);
		badArgument.extensionBundle.name = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's name (optional) must be provided as a string, \n{}\n (object) received",
		);
		badArgument.extensionBundle.name = 'hello';
		badArgument.extensionBundle.id = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's ID must be provided as a string, true (boolean) received",
		);
		badArgument.extensionBundle.id = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's ID must be provided as a string, 42 (number) received",
		);
		badArgument.extensionBundle.id = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's ID must be provided as a string, \n[]\n (array) received",
		);
		badArgument.extensionBundle.id = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's ID must be provided as a string, \n{}\n (object) received",
		);
		badArgument.extensionBundle.id = ['hello'];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: The bundle\'s ID must be provided as a string, \n["hello"]\n (array) received',
		);
		badArgument.extensionBundle.id = { hello: 'world' };
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: The bundle\'s ID must be provided as a string, \n{ "hello": "world" }\n (object) received',
		);
		badArgument.extensionBundle.id = 'com.hello';
		badArgument.extensionBundle.version = 'hello';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's version must be provided as a number or string containing a VersionNumber (type), 'hello' (string) received",
		);
		badArgument.extensionBundle.version = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's version must be provided as a number or string containing a VersionNumber (type), true (boolean) received",
		);
		badArgument.extensionBundle.version = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's version must be provided as a number or string containing a VersionNumber (type), \n[]\n (array) received",
		);
		badArgument.extensionBundle.version = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's version must be provided as a number or string containing a VersionNumber (type), \n{}\n (object) received",
		);
		badArgument.extensionBundle.version = '1.0.0';
		badArgument.extensionBundle.cepVersion = 'hello';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's CEP version must be provided as a CEPVersion(enum), 'hello' (string) received",
		);
		badArgument.extensionBundle.cepVersion = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's CEP version must be provided as a CEPVersion(enum), true (boolean) received",
		);
		badArgument.extensionBundle.cepVersion = 45;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's CEP version must be provided as a CEPVersion(enum), 45 (number) received",
		);
		badArgument.extensionBundle.cepVersion = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's CEP version must be provided as a CEPVersion(enum), \n[]\n (array) received",
		);
		badArgument.extensionBundle.cepVersion = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: The bundle's CEP version must be provided as a CEPVersion(enum), \n{}\n (object) received",
		);
	});
	it('invalidates an object without an extension', () => {
		badArgument = { extensionBundle: validEntensionBundle };
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensions must be provided as ExtensionListArgument (type), undefined (undefined) received',
		);
	});
	let validArgument: ExtensionManifestArgument | any;
	it('Doesnt generates xml in .debug context', () => {
		validArgument = {
			extensionBundle: validEntensionBundle,
			extensions: cepConfig.extensions,
		};
		const manifest = new ExtensionManifest(validArgument);
		expect(manifest.xml(['.debug'])).toBe('');
	});
	it('Generates xml', () => {
		validArgument = {
			...cepConfig.manifest,
			extensions: cepConfig.extensions,
			executionEnvironment: cepConfig.executionEnvironment,
		};
		let extensionManifest = new ExtensionManifest(validArgument);
		let manifestXML = extensionManifest.xml(['manifest.xml']);
		expect(manifestXML).not.toBe('');
		expect(typeof manifestXML).toBe('string');
		expect(manifestXML).toMatch(/^<ExtensionManifest/);
		expect(manifestXML).toMatch(/<\/ExtensionManifest>$/m);
		expect(manifestXML)
			.toBe(`<ExtensionManifest Version="8.0" ExtensionBundleId="my.bundle" ExtensionBundleVersion="7.0" ExtensionBundleName="Awsome Extensions Bundle">
	<Author>Samuel Charpentier</Author>
	<Contact mailto="samuel@jaunemoutarde.ca"/>
	<Legal href="https://AwsomeExtensions.com/legal"/>
	<Abstract href="https://AwsomeExtensions.com/legal"/>
	<ExtensionList>
		<Extension Id="my.extension" Version="0.0.1">
			<DependencyList>
				<Dependency Id="my.dependency" version="0.0.1"/>
			</DependencyList>
		</Extension>
	</ExtensionList>
	<ExecutionEnvironment>
		<HostList>
			<Host Name="AICY" Version="[0,99]"/>
			<Host Name="IDSN" Version="[0,99]"/>
			<Host Name="ILST" Version="[0,99]"/>
			<Host Name="PHXS" Version="[0,99]"/>
			<Host Name="PRLD" Version="[0,99]"/>
			<Host Name="PPRO" Version="[0,99]"/>
			<Host Name="DRWV" Version="[0,99]"/>
			<Host Name="FLPR" Version="[0,99]"/>
			<Host Name="AEFT" Version="[0,99]"/>
		</HostList>
		<LocaleList>
			<Locale Code="fr_CA"/>
			<Locale Code="en_US"/>
		</LocaleList>
		<RequiredRuntimeList>
			<RequiredRuntime Name="CSXS" Version="[2.0, 8.0]"/>
		</RequiredRuntimeList>
	</ExecutionEnvironment>
	<DispatchInfoList>
		<Extension Id="my.extension" Version="0.0.1">
			<HostList>
				<Host Name="ILST" Version="[0,99]"/>
				<Host Name="IDSN" Version="12"/>
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
				<ExtensionData>This extension is awesome</ExtensionData>
			</DispatchInfo>
			<DispatchInfo Host="IDSN">
				<ExtensionData>This DispatchInfo is for InDesign</ExtensionData>
			</DispatchInfo>
			<DependencyList>
				<Dependency Id="my.dependency" version="0.0.1"/>
			</DependencyList>
		</Extension>
	</DispatchInfoList>
</ExtensionManifest>
`);
		console.log(manifestXML);
	});
});
