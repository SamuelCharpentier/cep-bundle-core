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