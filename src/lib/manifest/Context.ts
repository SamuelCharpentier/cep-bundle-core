import { badArgumentError } from '../errorMessages';
export type Context =
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

export const isValidContext = <(value: any) => value is Context>((value: any) => {
	return (
		value === '.debug' ||
		value === 'manifest.xml' ||
		value === 'ExtensionManifest' ||
		value === 'Author' ||
		value === 'Contact' ||
		value === 'HrefElement' ||
		value === 'Legal' ||
		value === 'Abstract' ||
		value === 'ExtensionList' ||
		value === 'Extension' ||
		value === 'ExecutionEnvironment' ||
		value === 'HostList' ||
		value === 'Host' ||
		value === 'LocaleList' ||
		value === 'LocaleElement' ||
		value === 'RequiredRuntimeList' ||
		value === 'RequiredRuntime' ||
		value === 'DispatchInfoList' ||
		value === 'DispatchInfo' ||
		value === 'DependencyList' ||
		value === 'Dependency' ||
		value === 'Resources' ||
		value === 'MainPath' ||
		value === 'ScriptPath' ||
		value === 'CEFCommandLine' ||
		value === 'Parameter' ||
		value === 'Lifecycle' ||
		value === 'AutoVisible' ||
		value === 'StartOn' ||
		value === 'Event' ||
		value === 'UI' ||
		value === 'Type' ||
		value === 'Menu' ||
		value === 'Geometry' ||
		value === 'Icons' ||
		value === 'ExtensionData'
	);
});

function validateArrayOfContext(arg: any): arg is Context[] {
	if (!(arg instanceof Array)) return false;
	if (arg.length === 0) return false;
	for (const value of arg) {
		if (!isValidContext(value)) return false;
	}
	return true;
}

function getValidTargetContextsArgument(arg: any, functionName: string): Context[] {
	arg = typeof arg === 'string' ? [arg] : arg;
	if (!validateArrayOfContext(arg)) {
		throw new Error(badArgumentError(`${functionName}'s first argument`, 'valid Context or Array of Context', arg));
	}
	return arg;
}

export function contextContainsOneOf(targetContexts: any): (parent: Context[]) => boolean {
	targetContexts = getValidTargetContextsArgument(targetContexts, 'contextContainsOneOf');
	return (parent: Context[]) => {
		if (!(parent instanceof Array)) throw new Error(badArgumentError('Context parent', 'array of strings', parent));
		for (const context of targetContexts) {
			if (parent.includes(context)) return true;
		}
		return false;
	};
}
export function contextContainsAllOf(targetContexts: Context | Context[]): (parent: Context[]) => boolean {
	const targetContextsArray = getValidTargetContextsArgument(targetContexts, 'contextContainsAllOf');
	return (parent: Context[]) => {
		if (!(parent instanceof Array)) throw new Error(badArgumentError('Context parent', 'array of strings', parent));

		for (const context of targetContextsArray) {
			if (!parent.includes(context)) return false;
		}
		return true;
	};
}
export function contextContainsNoneOf(targetContexts: Context | Context[]): (parent: Context[]) => boolean {
	const targetContextsArray = getValidTargetContextsArgument(targetContexts, 'contextContainsNoneOf');
	return (parent: Context[]) => {
		if (!(parent instanceof Array)) throw new Error(badArgumentError('Context parent', 'array of strings', parent));

		for (const context of targetContextsArray) {
			if (parent.includes(context)) return false;
		}
		return true;
	};
}
