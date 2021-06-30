type email = `${string}@${string}.${string}`;

interface Contact {
	mailto: email;
}

interface Legal {
	href: URL;
}

interface Abstract {
	href: URL;
}

interface Extension {
	attributes: {
		Id: string;
		Version: string;
	};
}

enum HostsByName {
	'InCopy' = 'AICY',
	'InDesign' = 'IDSN',
	'Illustrator' = 'ILST',
	'Photoshop' = 'PHXS',
	'Prelude' = 'PRLD',
	'Premiere Pro' = 'PPRO',
	'Dreamweaver' = 'DRWV',
	'Flash Pro' = 'FLPR',
	'After Effects' = 'AEFT',
}

interface Host {
	Name: HostsByName;
	Version: string;
}

interface Locale {
	attribute: {
		Code: string;
	};
}
interface Runtime {
	name: 'CSXS';
	version: string;
}

interface ExecutionEnvironment {
	hostList: Host[] | Host;
	localeList: Locale[] | Locale;
	RequiredRuntimeList: {
		RequiredRuntime: Runtime;
	};
}

interface Resources {
	MainPath: string;
	ScriptPath?: string;
}

enum StartOnEvents {
	documentAfterActivate,
	documentAfterDeactivate,
	applicationActivate,
	applicationBeforeQuit,
	documentAfterSave,
}

interface Lifecycle {
	AutoVisible: boolean;
	StartOn: StartOnEvents;
}

enum UITypes {
	Panel,
	ModalDialog,
	Modeless,
}

interface Size {
	Height: number;
	Width: number;
}
interface MaxSize {
	Height?: number;
	Width?: number;
}
interface MinSize {
	Height?: number;
	Width?: number;
}

interface Geometry {
	Size: Size;
	MaxSize?: MaxSize;
	MinSize?: MinSize;
}

interface UI {
	Type?: UITypes;
	Menu?: string;
	Geometry?: Geometry;
}
enum iconTypes {
	Normal,
	Disabled,
	Rollover,
}
interface Icon {
	path: string;
	Type: iconTypes;
}

interface DispatchInfo {
	resources: Resources;
	lifecycle: Lifecycle;
	UI: UI;
	Icons: Icon[] | Icon;
	attribute?: { Host?: HostsByName };
}

interface DispatchInfoList {
	Extension: {
		attributes: {
			Id: string;
		};
		dispatchInfo: DispatchInfo[] | DispatchInfo;
	};
}

interface ExtensionData {
	attributes: {
		Id: string;
		host?: HostsByName;
	};
}

interface ExtensionManifest {
	author?: string;
	contact?: { attributes: Contact };
	legal?: { attributes: Legal };
	abstract?: { attributes: Abstract };
	extensionList: Extension[] | Extension;
	executionEnvironment: ExecutionEnvironment;
	dispatchInfoList: DispatchInfoList;
	extensionData?: ExtensionData;
}
