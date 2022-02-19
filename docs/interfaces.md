# [CEP Bundle Core](../README.md) **INTERFACES**

## **HostArgument**

[HostEngine (enum)](enums.md#HostEngine), [All (type)](types.md#All)

```typescript
interface HostArgument {
	host: HostEngine | keyof typeof HostEngine;
	version: All | RangedVersion;
	debugPort?: number | `${number}`;
}
```

---

## **URL**

```typescript
interface URL {
	hash: string;
	host: string;
	hostname: string;
	href: string;
	readonly origin: string;
	password: string;
	pathname: string;
	port: string;
	protocol: string;
	search: string;
	username: string;
	toString(): string;
}
```

**Note :** This interface is pre-built right into typescript.

---

## **AttributeArgument**

```typescript
interface AttributeArgument {
	name: string;
	value: string;
	context?: (parents: string[]) => boolean;
}
```

---

## **MenuArgument**

[Placement (type)](types.md#Placement)

```typescript
interface MenuArgument {
	menuName: string;
	placement?: Placement;
}
```

---

## **WidthHeight**

```typescript
interface WidthHeight {
	width: `${number}` | number;
	height: `${number}` | number;
}
```

---

## **UIArgument**

[TypeArgument (type)](types.md#TypeArgument)

[MenuArgument (interface)](#MenuArgument)

[GeometryArgument (type)](types.md#GeometryArgument)

[IconsArgument (type)](types.md#IconsArgument)

```typescript
interface UIArgument {
	type?: TypeArgument;
	menu?: MenuArgument;
	geometry?: GeometryArgument;
	icons?: IconsArgument;
}
```

---

## **UIArgument**

[Context (type)](types.md#Context)

```typescript
interface AttributeArgument {
	name: string;
	value: string;
	context?: (parents: Context[]) => boolean;
}
```
