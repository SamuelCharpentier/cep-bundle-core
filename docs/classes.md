# [CEP Bundle Core](../README.md) **CLASSES**

## All classes

[XMLElement](#XMLElement)

-   [Extensions](#Extensions)

    -   [HostList](#HostList)

        -   [Host](#Host)

    -   [DispatchInfo](#DispatchInfo)

        -   [Resources](#Resources)

            -   [MainPath](#MainPath)
            -   [isScriptPathArgument](#isScriptPathArgument)
            -   [CEFCommandLine](#CEFCommandLine)

        -   [Lifecycle](#Lifecycle)

            -   [AutoVisible](#AutoVisible)
            -   [StartOn](#StartOn)

        -   [UI](#UI)

            -   [Type](#Type)
            -   [Menu](#Menu)
            -   [Geometry](#Geometry)
            -   [Icons](#Icons)

---

## **HostList**

Extends [XMLElement (class)](#XMLElement). Holds an array of [Host (class)](#Host).

### Argument

It expects an argument of type [HostListArgument (type)](types.md#HostListArgument)

### Usage

```typescript
new HostList(hostList: HostListArgument)
```

Used by [ExecutionEnvironment (class)](#ExecutionEnvironment) and [Extension (class)](#Extension)

---

## **Host**

Extends [XMLElement (class)](#XMLElement).Holds the information of each hosts the extension will be available in.

### Argument

It expects an argument of type [HostArgument (type)](types.md#HostArgument)

### Usage

```typescript
new Host({ host, version, debugPort }: HostArgument)
```

Used by [HostList (class)](#HostList)

---

## **Lifecycle**

Extends [XMLElement (class)](#XMLElement). Holds the information of the extension's lifecycle.

### Argument

It expects an argument of type [LifecycleArgument (type)](types.md#LifecycleArgument)

### Usage

```typescript
new Lifecycle({ autoVisible?: boolean; startOn?: EventType | EventType[] });
```

Used by [DispatchInfo (class)](#DispatchInfo)

---

## **AutoVisible**

Extends [XMLElement (class)](#XMLElement). Contains wether it should be visible automatically.

### Argument

It expects a boolean argument

### Usage

```typescript
new AutoVisible(Boolean);
```

Used by [Lifecycle (class)](#Lifecycle)

---

## **StartOn**

Extends [XMLElement (class)](#XMLElement). Holds the event(s) on which the extension should start.

### Argument

It expects an argument of type [EventType (type)](types.md#EventType) or an array of [EventType (type)](types.md#EventType)

### Usage

```typescript
new StartOn(EventType|EventType[])
```

Used by [Lifecycle (class)](#Lifecycle)

---

## **UI**

Extends [XMLElement (class)](#XMLElement). Holds the UI elements: [Type](#Type), [Menu](#Menu), [Geometry](#Geometry) and [Icons](#Icons).

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

Used by [DispatchInfo (class)](#DispatchInfo)

---

## **Type**

Extends [XMLElement (class)](#XMLElement).Holds the information of which type the extension UI should be.

### Argument

It expects an argument of type [TypeArgument (type)](types.md#TypeArgument)

### Usage

```typescript
new Type(type: TypeArgument)
```

Used by [UI (class)](#UI)

---

## **Menu**

Extends [XMLElement (class)](#XMLElement). Holds the menu item name and its placement (optional).

### Argument

It expects an argument of type [MenuArgument (interface)](interfaces.md#MenuArgument)

### Usage

```typescript
new Menu({menuName:string, placement?:Placement}: MenuArgument)
```

Used by [UI (class)](#UI)

---

## **Geometry**

Extends [XMLElement (class)](#XMLElement). Holds the Width and Height of the extension pannel (optional).

### Argument

It expects an argument of type [GeometryArgument (type)](types.md#GeometryArgument)

### Usage

```typescript
new Geometry({ [key in SizesTypes]: Undefined | WidthHeight });
```

Used by [UI (class)](#UI)

---

## **Icons**

Extends [XMLElement (class)](#XMLElement). Holds path to the extension's icons (optional).

### Argument

It expects an argument of type [IconsArgument (type)](types.md#IconsArgument)

### Usage

```typescript
new Icon({ [key in IconType]: RelativePath });
```

Used by [UI (class)](#UI)

---
