# [CEP Bundle Core](../README.md) **CLASSES**

## **HostList** 


Extends [XMLElement (class)](#XMLElement). Holds an array of [Host (class)](#Host).

### Argument

It expects an argument of type [HostListArgument (type)](types.md#HostListArgument)

### Usage

```typescript
new HostList(hostList: HostListArgument)
```
Used by [ExecutionEnvironment (class)](#ExecutionEnvironment) and [Extension (class)](#Extension)

----------

## **Host**

Holds the information of each hosts the extension will be available in.

### Argument

It expects an argument of type [HostArgument (type)](types.md#HostArgument)

### Usage


```typescript
new Host({ host, version, debugPort }: HostArgument)
```
Used by [HostList (class)](#HostList)