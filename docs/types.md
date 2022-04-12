# [CEP Bundle Core](../README.md) **TYPES**

## **HostListArgument**

[HostArgument (interface)](interfaces.md#HostArgument), [All (type)](#All)

```typescript
type HostListArgument = HostArgument | HostArgument[] | All;
```

---

## **All**

```typescript
type All = 'All' | 'ALL' | 'all';
```

---

## **RangedVersion**

[VersionNumber (type)](#VersionNumber)

```typescript
type RangedVersion =
	| number
	| VersionNumber
	| `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`;
```

---

## **VersionNumber**

A version consists of major.minor.micro.special. major, minor, micro must be numbers (version parts can have up to 9 digits) and special can be any string (regex matching [\W_-]+). At least the major has to be specified, all other elements are optional. If minor or micro versions are not specified, they are assumed to be zero. When it comes to comparing versions the special discriminator will be compared based on UTF-8 encoding.

Each `${number}` is composed with a maximum of 9 digits, so the longest version is `999999999.999999999.999999999.aStringOfAnyLength`

```typescript
type VersionNumber =
	| `${number}`
	| `${number}.${number}`
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}.${string}`;
```

---

## **NumberString**

```typescript
type NumberString = `${number}` | `${number}.${number}` | number;
```

---

## **EmailAddress**

```typescript
type EmailAddress = `${string}@${string}.${string}`;
```

**Note :** Email gets validated with a precice regex, this is just for a simple typescript IDE warning when possible.

---

## **RelativePath**

```typescript
type RelativePath = `./${string}`;
```

---

## **Command**

```typescript
type Command =
	| '--enable-media-stream'
	| '--enable-speech-input'
	| '--persist-session-cookies'
	| '--disable-image-loading'
	| '--disable-javascript-open-windows'
	| '--disable-javascript-close-windows'
	| '--disable-javascript-access-clipboard'
	| '--enable-caret-browsing'
	| '--proxy-auto-detect'
	| '--user-agent'
	| '--disable-application-cache'
	| '--enable-nodejs'
	| '--disable-pinch'
	| '--mixed-conext'
	| `--${string}`
	| `--${string}=${string}`;
```

---

## **EventType**

```typescript
type EventType = string;
```

**Note :** This needs to be enhanced.

---

## **Placement**

```typescript
type Placement = string;
```

**Note :** This needs to be enhanced.

---

## **ID**

```typescript
type ID = string;
```

---

## **TypeArgument**

[UIType (enum)](enums.md#UIType)

```typescript
type TypeArgument = UIType | `${UIType}` | keyof typeof UIType;
```

## **GeometryArgument**

[SizesTypes (enum)](enums.md#SizesTypes)

[WidthHeight (interface)](interfaces.md#WidthHeight)

```typescript
type GeometryArgument = { [key in SizesTypes]?: WidthHeight };
```

---

## **IconsArgument**

[IconType (enum)](enums.md#IconType)

[RelativePath (type)](#RelativePath)

```typescript
type IconsArgument = { [key in IconType]?: RelativePath };
```

---

## **RelativePath**

```typescript
type RelativePath = `./${string}`;
```

---

## **LifecycleArgument**

```typescript
type LifecycleArgument = {
	autoVisible?: boolean;
	startOn?: EventType | EventType[];
};
```

---

## **EventType**

```typescript
type EventType = string;
```

---

## **ResourcesArgument**

[RelativePath (type)](#RelativePath)

[CEFCommandLineArgument](#CEFCommandLineArgument)

```typescript
type ResourcesArgument = {
	mainPath?: RelativePath;
	scriptPath?: RelativePath;
	cefParams?: CEFCommandLineArgument;
};
```

---

## **CEFCommandLineArgument**

[Command (type)](#Command)

```typescript
type CEFCommandLineArgument = Command | Command[];
```

---

## **Command**

```typescript
type Command =
	| '--enable-media-stream'
	| '--enable-speech-input'
	| '--persist-session-cookies'
	| '--disable-image-loading'
	| '--disable-javascript-open-windows'
	| '--disable-javascript-close-windows'
	| '--disable-javascript-access-clipboard'
	| '--enable-caret-browsing'
	| '--proxy-auto-detect'
	| '--user-agent'
	| '--disable-application-cache'
	| '--enable-nodejs'
	| '--disable-pinch'
	| '--mixed-conext'
	| `--${string}`
	| `--${string}=${string}`;
```

---

## **ExtensionArgument**

[HostListArgument](#HostListArgument)

[DispatchInfoArgument](#DispatchInfoArgument)

[DependencyArgument](#DependencyArgument)

```typescript
type ExtensionArgument = {
	id: string;
	version?: VersionNumber;
	hostList?: HostListArgument | HostListArgument[];
	dispatchInfo?: DispatchInfoArgument;
	dependencyList?: DependencyArgument | DependencyArgument[];
};
```

---

## **DispatchInfoArgument**

[ResourcesArgument](#ResourcesArgument)

[LifecycleArgument](#LifecycleArgument)

[UIArgument](interfaces.md#UIArgument)

[HostEngine](enums.md#HostEngine)

```typescript
type DispatchInfoArgument = {
	resources?: ResourcesArgument;
	lifecycle?: LifecycleArgument;
	ui?: UIArgument;
	extensionData?: string | string[];
	host?: `${HostEngine}` | keyof typeof HostEngine;
};
```

---

## **DependencyArgument**

[VersionNumber](#VersionNumber)

```typescript
type DependencyArgument = { id: string; version?: VersionNumber };
```

---

## **ExtensionListArgument**

[ExtensionArgument](#ExtensionArgument)

```typescript
type ExtensionListArgument = ExtensionArgument | ExtensionArgument[];
```

---

## **DispatchInfoListArgument**

```typescript
type DispatchInfoListArgument = ExtensionArgument | ExtensionArgument[];
```

---

## **EmailAddress**

```typescript
type EmailAddress = `${string}@${string}.${string}`;
```

---

## **Context**

```typescript
type Context =
	| '.debug'
	| 'manifest.xml'
	| 'ExtensionManifest'
	| 'Author'
	| 'Contact'
	| 'HrefElement'
	| 'Legal'
	| 'Abstract'
	| 'ExtensionList'
	| 'Extension'
	| 'ExecutionEnvironment'
	| 'HostList'
	| 'Host'
	| 'LocaleList'
	| 'LocaleElement'
	| 'RequiredRuntimeList'
	| 'RequiredRuntime'
	| 'DispatchInfoList'
	| 'DispatchInfo'
	| 'DependencyList'
	| 'Dependency'
	| 'Resources'
	| 'MainPath'
	| 'ScriptPath'
	| 'CEFCommandLine'
	| 'Parameter'
	| 'Lifecycle'
	| 'AutoVisible'
	| 'StartOn'
	| 'Event'
	| 'UI'
	| 'Type'
	| 'Menu'
	| 'Geometry'
	| 'Icons'
	| 'ExtensionData';
```

---

## **ContextFilter**

[Context (type)](types.md#Context)

```typescript
type ContextFilter = (parents: Context[]) => boolean;
```

---

## **XMLElementArgument**

[AttributeArgument (interface)](interfaces.md#AttributeArgument)

[XMLElement (class)](classes.md#XMLElement)

[XMLStringContentArgument (class)](classes.md#XMLStringContentArgument)

[ContextFilter (type)](#ContextFilter)

```typescript
type XMLElementArgument = {
	name: string;
	attributes?: AttributeArgument | AttributeArgument[];
	content?: XMLElement | XMLElement[] | XMLStringContentArgument;
	context?: ContextFilter;
};
```

---

---

## **StringContentArgument**

[ContextFilter (type)](#ContextFilter)

```typescript
type StringContentArgument = {
	value: string | number;
	context?: ContextFilter;
};
```

---

## **XMLStringContentArgument**

[StringContentArgument (type)](#StringContentArgument)

```typescript
type XMLStringContentArgument = string | number | StringContentArgument;
```

---

<!--

## ****

```typescript

```

---
-->
