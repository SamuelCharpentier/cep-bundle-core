# [CEP Bundle Core](../README.md) **CLASSES**

## All classes

[XMLElement](#XMLElement)

-   [ExtensionManifest](#ExtensionManifest)

    -   [Author](#Author)

    -   [Contact](#Contact)

    -   [Legal](#Legal)

    -   [Abstract](#Abstract)

    -   [ExtensionList](#ExtensionList)
    -   [ExecutionEnvironment](#ExecutionEnvironment)
    -   [DispatchInfoList](#DispatchInfoList)

        -   [Extension](#Extension)

            -   [HostList](#HostList)

                -   [Host](#Host)

            -   [DispatchInfo](#DispatchInfo)

                -   [Resources](#Resources)

                    -   [MainPath](#MainPath)
                    -   [ScriptPath](#ScriptPath)
                    -   [CEFCommandLine](#CEFCommandLine)

                -   [Lifecycle](#Lifecycle)

                    -   [AutoVisible](#AutoVisible)
                    -   [StartOn](#StartOn)

                -   [UI](#UI)

                    -   [Type](#Type)
                    -   [Menu](#Menu)
                    -   [Geometry](#Geometry)
                    -   [Icons](#Icons)

                -   [ExtensionData](#ExtensionData)

            -   [DependencyList](#DependencyList)

                -   [Dependency](#Dependency)

---

## **Author**

Extends [XMLElement (class)](#XMLElement). An optional author of this ExtensionBundle.

### Argument

It expects an argument of type string.

### Usage

```typescript
new Legal(new URL('https://legal.com' | 'https://legal.com'));
```

## Nested in [ExtensionManifest (class)](#ExtensionManifest)

---

## **Contact**

Extends [XMLElement (class)](#XMLElement). An optional contact for this ExtensionBundle.

### Argument

It expects an argument of type [EmailAddress](types.md#EmailAddress).

### Usage

```typescript
new Legal(new URL('https://legal.com' | 'https://legal.com'));
```

## Nested in [ExtensionManifest (class)](#ExtensionManifest)

---

## **Legal**

Extends [XMLElement (class)](#XMLElement). An optional legal notice for this ExtensionBundle.

### Argument

It expects an argument of type string or URL (native type)

### Usage

```typescript
new Legal(new URL('https://legal.com' | 'https://legal.com'));
```

## Nested in [ExtensionManifest (class)](#ExtensionManifest)

---

## **Abstract**

Extends [XMLElement (class)](#XMLElement). An optional abstract for this ExtensionBundle.

### Argument

It expects an argument of type string or URL (native type)

### Usage

```typescript
new Abscract(new URL('https://abstract.com' | 'https://abstract.com'));
```

Nested in [ExtensionManifest (class)](#ExtensionManifest)

---

## **ExtensionList**

Extends [XMLElement (class)](#XMLElement). Contains a list of extensions defined in this ExtensionManifest. It contains a list of [Extension](#Extension).

### Argument

It expects an argument of type [ExtensionListArgument (type)](types.md#ExtensionListArgument)

### Usage

```typescript
new ExtensionList(extensionListArgument: ExtensionListArgument)
```

Nested in [ExtensionList (class)](#ExtensionList)

---

## **DispatchInfoList**

Extends [XMLElement (class)](#XMLElement). It contains a list for every [Extension](#Extension)'s attributes.

### Argument

It expects an argument of type [DispatchInfoListArgument (type)](types.md#DispatchInfoListArgument)

### Usage

```typescript
new ExtensionList(extensionListArgument: ExtensionListArgument)
```

Nested in [ExtensionList (class)](#ExtensionList)

---

## **Extension**

Extends [XMLElement (class)](#XMLElement). An Extension contains the name and version as well as all parameter used to control the extension. The only mandatory attribute to the extension is its ID. It has an optional version attribute. It contains [HostList](#HostList), [DispatchInfo](#DispatchInfo) and [DependencyList](#DependencyList).

### Argument

It expects an argument of type [ExtensionArgument (type)](types.md#ExtensionArgument)

### Usage

```typescript
new Extension(extensionArgument: ExtensionArgument)
```

Nested in [ExtensionList (class)](#ExtensionList) and in [DispatchInfoList (class)](#DispatchInfoList)

---

## **HostList**

Extends [XMLElement (class)](#XMLElement). Contains an array of [Host (class)](#Host).

### Argument

It expects an argument of type [HostListArgument (type)](types.md#HostListArgument)

### Usage

```typescript
new HostList(hostList: HostListArgument)
```

Nested in [ExecutionEnvironment (class)](#ExecutionEnvironment) and [Extension (class)](#Extension)

---

## **Host**

Extends [XMLElement (class)](#XMLElement). Contains the information of each hosts the extension will be available in.

### Argument

It expects an argument of type [HostArgument (type)](types.md#HostArgument)

### Usage

```typescript
new Host({ host, version, debugPort }: HostArgument)
```

Nested in [HostList (class)](#HostList)

---

## **DispatchInfo**

Extends [XMLElement (class)](#XMLElement). A DispatchInfo contains all parameter which are needed to run an extension. A DispatchInfo can have an optional attribute "Host" to define specific attributes per "Host". If an DispatchInfo has no "Host" it will act as a default for all values which are not set in a specific Host-DispatchInfo. it contains [Resources](#Resources), [Lifecycle](#Lifecycle), [UI](#UI) and [ExtensionData](#ExtensionData).

### Argument

It expects an argument of type [DispatchInfoArgument (type)](types.md#DispatchInfoArgument)

### Usage

```typescript
new DispatchInfo({
	resources?: ResourcesArgument;
	lifecycle?: LifecycleArgument;
	ui?: UIArgument;
	extensionData?: string | string[];
	host?: `${HostEngine}` | keyof typeof HostEngine;
}:DispatchInfoArgument)
```

Nested in [Extension (class)](#Extension)

---

## **Resources**

Extends [XMLElement (class)](#XMLElement). Contains a [MainPath (class)](#MainPath), a [ScriptPath (class)](#ScriptPath) and a [CEFCommandLine (class)](#CEFCommandLine).

### Argument

It expects an argument of type [ResourcesArgument (type)](types.md#ResourcesArgument)

### Usage

```typescript
new Resources({
    mainPath?: RelativePath;
    scriptPath?: RelativePath;
    cefParams?: CEFCommandLineArgument;
});
```

Nested in [DispatchInfo (class)](#DispatchInfo)

---

## **MainPath**

Extends [XMLElement (class)](#XMLElement). Contains the path to the main file of the extension (e.g. main.swf / index.html).

### Argument

It expects an argument of type [RelativePath (type)](types.md#RelativePath)

### Usage

```typescript
new MainPath(mainPath: RelativePath)
```

Nested in [Resources (class)](#Resources)

---

## **ScriptPath**

Extends [XMLElement (class)](#XMLElement). Contains the path to the extension's script file.

### Argument

It expects an argument of type [RelativePath (type)](types.md#RelativePath)

### Usage

```typescript
new ScriptPath(scriptPath: RelativePath)
```

Nested in [Resources (class)](#Resources)

---

## **CEFCommandLine**

Extends [XMLElement (class)](#XMLElement). Contains the command line arguments for the extension.

### Argument

It expects an argument of type [CEFCommandLineArgument (type)](types.md#CEFCommandLineArgument)

### Usage

```typescript
new CEFCommandLine(cefParams: CEFCommandLineArgument)
```

Nested in [Resources (class)](#Resources)

---

## **Lifecycle**

Extends [XMLElement (class)](#XMLElement). Contains the information of the extension's lifecycle.

### Argument

It expects an argument of type [LifecycleArgument (type)](types.md#LifecycleArgument)

### Usage

```typescript
new Lifecycle({
    autoVisible?: boolean;
    startOn?: EventType | EventType[]
});
```

Nested in [DispatchInfo (class)](#DispatchInfo)

---

## **AutoVisible**

Extends [XMLElement (class)](#XMLElement). Controls whether the extension's UI should be made visible automatically when started or if the extension wants to control this itself. Panel type extensions should always be made visible automatically in order to maintain consistency with non-CEP panels.

### Argument

It expects a boolean argument

### Usage

```typescript
new AutoVisible(Boolean);
```

Nested in [Lifecycle (class)](#Lifecycle)

---

## **StartOn**

Extends [XMLElement (class)](#XMLElement). Contains the event(s) on which the extension should start.

### Argument

It expects an argument of type [EventType (type)](types.md#EventType) or an array of [EventType (type)](types.md#EventType)

### Usage

```typescript
new StartOn(EventType|EventType[])
```

Nested in [Lifecycle (class)](#Lifecycle)

---

## **UI**

Extends [XMLElement (class)](#XMLElement). Contains the UI elements: [Type](#Type), [Menu](#Menu), [Geometry](#Geometry) and [Icons](#Icons).

### Argument

It expects an argument of type [UIArgument (interface)](interfaces.md#UIArgument)

### Usage

```typescript
new UI({
	type: Undefined | TypeArgument,
	menu: Undefined | MenuArgument,
	geometry: Undefined | GeometryArgument,
	icons: Undefined | IconsArgument,
});
```

Nested in [DispatchInfo (class)](#DispatchInfo)

---

## **Type**

Extends [XMLElement (class)](#XMLElement).Contains the information of which type the extension UI should be.

### Argument

It expects an argument of type [TypeArgument (type)](types.md#TypeArgument)

### Usage

```typescript
new Type(type: TypeArgument)
```

Nested in [UI (class)](#UI)

---

## **Menu**

Extends [XMLElement (class)](#XMLElement). Contains the menu item name and its placement (optional).

### Argument

It expects an argument of type [MenuArgument (interface)](interfaces.md#MenuArgument)

### Usage

```typescript
new Menu({menuName:string, placement?:Placement}: MenuArgument)
```

Nested in [UI (class)](#UI)

---

## **Geometry**

Extends [XMLElement (class)](#XMLElement). Contains the Width and Height of the extension pannel (optional).

### Argument

It expects an argument of type [GeometryArgument (type)](types.md#GeometryArgument)

### Usage

```typescript
new Geometry({ [key in SizesTypes]: Undefined | WidthHeight });
```

Nested in [UI (class)](#UI)

---

## **Icons**

Extends [XMLElement (class)](#XMLElement). Contains path to the extension's icons (optional).

### Argument

It expects an argument of type [IconsArgument (type)](types.md#IconsArgument)

### Usage

```typescript
new Icon({ [key in IconType]: RelativePath });
```

Nested in [UI (class)](#UI)

---

## **ExtensionData**

Extends [XMLElement (class)](#XMLElement). Contains arbitrary information about this extension. (optional).

### Argument

It expects an argument of type String (type)

### Usage

```typescript
new ExtensionData(string);
```

Nested in [UI (class)](#UI)

---

## **DependencyList**

Extends [XMLElement (class)](#XMLElement). Specifies a list of extensions which this extension depends upon. Adobe Extension Manager will install this extension only if all of its strict dependencies are already installed in the system. (optional).

### Argument

It expects an argument of type [DependencyArgument](#DependencyArgument) or an array of [DependencyArgument](#DependencyArgument)

### Usage

```typescript
new DependencyList(DependencyArgument|DependencyArgument[]);
```

Nested in [DispatchInfo (class)](#DispatchInfo)

---

## **Dependency**

Extends [XMLElement (class)](#XMLElement). Specifies an extension which this extension depends on. (optional).

### Argument

It expects an argument of type [DependencyArgument](#DependencyArgument)

### Usage

```typescript
new Dependency({ id: string; version?: VersionNumber });
```

Nested in [DependencyList (class)](#DependencyList)

---
