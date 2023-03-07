import {
	ExtensionManifest,
	BundleInfos,
	ExtensionManifestArgument,
} from '@manifest/ExtensionManifest';
import { deepObjectMerge } from '@src/lib/deepObjectMerge';
import { getManifestConfig } from '@src/lib/manifestConfig/getManifestConfig';

const cepConfig = getManifestConfig(__dirname);

function tryToInstantiateClassWithDeepMergedArguments(
	clss: any,
	...args: { [key: string]: any }[]
): any {
	const arg: any = deepObjectMerge(...args);
	try {
		new clss(arg);
	} catch (error) {
		throw error;
	}
}

describe('ExtensionManifest', () => {
	it('Is defined', () => {
		expect(ExtensionManifest).toBeDefined();
	});
	var badArgument: any;
	it('Invalidates an empty argument', () => {
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), undefined (undefined) received',
		);
		badArgument = '';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), '' (string) received",
		);
		badArgument = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), \n[]\n(array) received',
		);
		badArgument = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), \n{}\n(object) received',
		);
	});
	it('invalidates a bad argument', () => {
		badArgument = 'hello';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), 'hello' (string) received",
		);
		badArgument = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), 42 (number) received',
		);
		badArgument = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), true (boolean) received',
		);
		badArgument = ['hello'];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: the manifest configs must be provided as a ExtensionManifestArgument (type), \n["hello"]\n(array) received',
		);
	});
	const validEntensionBundle: BundleInfos | any = cepConfig.extensionBundle;
	it('invalidates an an argument object with a key extensionBundle that is not an object with some keys', () => {
		badArgument = { ...cepConfig };
		badArgument.extensionBundle = undefined;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle must be provided as a BundleInfos (type), undefined (undefined) received',
		);

		badArgument.extensionBundle = 'hello';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: extensionBundle must be provided as a BundleInfos (type), 'hello' (string) received",
		);
		badArgument.extensionBundle = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle must be provided as a BundleInfos (type), \n[]\n(array) received',
		);
		badArgument.extensionBundle = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle must be provided as a BundleInfos (type), \n{}\n(object) received',
		);
		badArgument.extensionBundle = { ...validEntensionBundle };
		badArgument.extensionBundle.name = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.name (optional) must be provided as a string, true (boolean) received',
		);
		badArgument.extensionBundle.name = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.name (optional) must be provided as a string, 42 (number) received',
		);
		badArgument.extensionBundle.name = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.name (optional) must be provided as a string, \n[]\n(array) received',
		);
		badArgument.extensionBundle.name = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.name (optional) must be provided as a string, \n{}\n(object) received',
		);
		badArgument.extensionBundle.name = 'hello';
		badArgument.extensionBundle.id = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.id must be provided as a string, true (boolean) received',
		);
		badArgument.extensionBundle.id = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.id must be provided as a string, 42 (number) received',
		);
		badArgument.extensionBundle.id = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.id must be provided as a string, \n[]\n(array) received',
		);
		badArgument.extensionBundle.id = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.id must be provided as a string, \n{}\n(object) received',
		);
		badArgument.extensionBundle.id = ['hello'];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.id must be provided as a string, \n["hello"]\n(array) received',
		);
		badArgument.extensionBundle.id = { hello: 'world' };
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.id must be provided as a string, \n{ "hello": "world" }\n(object) received',
		);
		badArgument.extensionBundle.id = 'com.hello';
		badArgument.extensionBundle.version = 'hello';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: extensionBundle.version must be provided as a VersionNumber (type), 'hello' (string) received",
		);
		badArgument.extensionBundle.version = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.version must be provided as a VersionNumber (type), true (boolean) received',
		);
		badArgument.extensionBundle.version = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.version must be provided as a VersionNumber (type), \n[]\n(array) received',
		);
		badArgument.extensionBundle.version = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.version must be provided as a VersionNumber (type), \n{}\n(object) received',
		);
		badArgument.extensionBundle.version = '1.0.0';
		badArgument.extensionBundle.cepVersion = 'hello';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: extensionBundle.cepVersion must be provided as a CEPVersion (enum), 'hello' (string) received",
		);
		badArgument.extensionBundle.cepVersion = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.cepVersion must be provided as a CEPVersion (enum), true (boolean) received',
		);
		badArgument.extensionBundle.cepVersion = 45;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.cepVersion must be provided as a CEPVersion (enum), 45 (number) received',
		);
		badArgument.extensionBundle.cepVersion = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.cepVersion must be provided as a CEPVersion (enum), \n[]\n(array) received',
		);
		badArgument.extensionBundle.cepVersion = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensionBundle.cepVersion must be provided as a CEPVersion (enum), \n{}\n(object) received',
		);
	});
	it('invalidates an object without a valid executionEnvironment', () => {
		badArgument = { ...cepConfig };
		badArgument.executionEnvironment = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: executionEnvironment (optional) must be provided as an ExecutionEnvironmentArgument (type), true (boolean) received',
		);
		badArgument.executionEnvironment = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: executionEnvironment (optional) must be provided as an ExecutionEnvironmentArgument (type), 42 (number) received',
		);
		badArgument.executionEnvironment = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: executionEnvironment (optional) must be provided as an ExecutionEnvironmentArgument (type), \n[]\n(array) received',
		);
		badArgument.executionEnvironment = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: executionEnvironment (optional) must be provided as an ExecutionEnvironmentArgument (type), \n{}\n(object) received',
		);
	});
	it('invalidates an object with a anything other than non empty string authorName', () => {
		badArgument = { ...cepConfig };
		badArgument.authorName = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: authorName (optional) must be provided as a non empty string, true (boolean) received',
		);
		badArgument.authorName = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: authorName (optional) must be provided as a non empty string, 42 (number) received',
		);
		badArgument.authorName = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: authorName (optional) must be provided as a non empty string, \n[]\n(array) received',
		);
		badArgument.authorName = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: authorName (optional) must be provided as a non empty string, \n{}\n(object) received',
		);
		badArgument.authorName = '';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: authorName (optional) must be provided as a non empty string, '' (string) received",
		);
	});
	it('invalidates an object with a anything other than non empty string contact', () => {
		badArgument = { ...cepConfig };
		badArgument.contact = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: contact (optional) must be provided as a non empty string, true (boolean) received',
		);
		badArgument.contact = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: contact (optional) must be provided as a non empty string, 42 (number) received',
		);
		badArgument.contact = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: contact (optional) must be provided as a non empty string, \n[]\n(array) received',
		);
		badArgument.contact = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: contact (optional) must be provided as a non empty string, \n{}\n(object) received',
		);
		badArgument.contact = '';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: contact (optional) must be provided as a non empty string, '' (string) received",
		);
	});
	it('invalidates an object with a anything other than non empty string legal', () => {
		badArgument = { ...cepConfig };
		badArgument.legal = true;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: legal (optional) must be provided as a non empty string, true (boolean) received',
		);
		badArgument.legal = 42;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: legal (optional) must be provided as a non empty string, 42 (number) received',
		);
		badArgument.legal = [];
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: legal (optional) must be provided as a non empty string, \n[]\n(array) received',
		);
		badArgument.legal = {};
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: legal (optional) must be provided as a non empty string, \n{}\n(object) received',
		);
		badArgument.legal = '';
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			"Validation Error: legal (optional) must be provided as a non empty string, '' (string) received",
		);
	});
	it('invalidates an object without extensions', () => {
		badArgument = { ...cepConfig };
		badArgument.extensions = undefined;
		expect(() => new ExtensionManifest(badArgument)).toThrow(
			'Validation Error: extensions must be provided as ExtensionListArgument (type), undefined (undefined) received',
		);
	});
	let validArgument: ExtensionManifestArgument | any;
	it('doesnt generate xml in .debug context', () => {
		validArgument = {
			extensionBundle: validEntensionBundle,
			extensions: cepConfig.extensions,
		};
		const manifest = new ExtensionManifest(validArgument);
		expect(manifest.xml(['.debug'])).toBe('');
		/**/
	});
	it('Generates xml', () => {
		validArgument = cepConfig;
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
