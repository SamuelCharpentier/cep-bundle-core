# [CEP Bundle Core](../README.md) **TYPES**

## **HostListArgument**
[HostArgument (interface)](interfaces.md#HostArgument), [All (type)](#All)

```typescript
type HostListArgument = HostArgument | HostArgument[] | All;
```

## All

```typescript
type All = 'All' | 'ALL' | 'all'
```
## RangedVersion
[VersionNumber (type)](#VersionNumber)

```typescript
type RangedVersion =
	| number
	| VersionNumber
	| `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`
```

## VersionNumber

```typescript
type VersionNumber =
	| `${number}`
	| `${number}.${number}`
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}.${number}`;
```