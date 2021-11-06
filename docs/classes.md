# [CEP Bundle Core](../README.md) **CLASSES**

## All classes

[XMLElement](#XMLElement)

-   [HostList](#HostList)

    -   [Host](#Host)

-   [UI](#UI)

    -   [Type](#Type)

    -   [Menu](#Menu)

    -   [Geometry](#Geometry)

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

<!-- ## **UI**

Extends [XMLElement (class)](#XMLElement). Holds the UI elements.

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

Used by [UI (class)](#UI) -->
