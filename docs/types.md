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
type RangedVersion = number | VersionNumber | `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`;
```

---

## **VersionNumber**

```typescript
type VersionNumber =
	| `${number}`
	| `${number}.${number}`
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}.${number}`;
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

<!--

## \*\*\*\*

```typescript

```

-->
