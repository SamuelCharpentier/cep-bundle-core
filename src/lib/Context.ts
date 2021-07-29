import { badArgumentError } from './errorMessages';
type Context =
	| 'any'
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
	| 'CEFCommandLine'
	| 'UI';
export function isValidContext(value: any): boolean {
	return (
		value === 'any' ||
		value === '.debug' ||
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
		value === 'CEFCommandLine' ||
		value === 'UI'
	);
}
export function validateTargetContextsArgument(targetContexts: Context | Context[], functionName: string): Context[] {
	if (typeof targetContexts === 'string' && isValidContext(targetContexts)) targetContexts = [targetContexts];
	if (!(targetContexts instanceof Array))
		throw new Error(
			badArgumentError(`${functionName}'s first argument`, 'valid Context or Array of Context', targetContexts),
		);
	for (const context of targetContexts) {
		if (!isValidContext(context))
			throw new Error(
				badArgumentError(
					`${functionName}'s first argument`,
					'string of Context type or Array of strings of Context type',
					context,
				),
			);
	}
	return targetContexts;
}
export function contextContainsOneOf(targetContexts: Context | Context[]): (parent: string[]) => boolean {
	targetContexts = validateTargetContextsArgument(targetContexts, 'contextContainsOneOf');
	return (parent: string[]) => {
		for (const context of targetContexts) {
			if (parent.includes(context)) return true;
		}
		return false;
	};
}
export function contextContainsAllOf(targetContexts: Context | Context[]): (parent: string[]) => boolean {
	targetContexts = validateTargetContextsArgument(targetContexts, 'contextContainsOneOf');
	return (parent: string[]) => {
		if (!(parent instanceof Array)) throw new Error(badArgumentError('Context parent', 'array of strings', parent));

		for (const context of targetContexts) {
			if (!parent.includes(context)) return false;
		}
		return true;
	};
}
export function contextContainsNoneOf(targetContexts: Context | Context[]): (parent: string[]) => boolean {
	targetContexts = validateTargetContextsArgument(targetContexts, 'contextContainsOneOf');
	return (parent: string[]) => {
		if (!(parent instanceof Array)) throw new Error(badArgumentError('Context parent', 'array of strings', parent));

		for (const context of targetContexts) {
			if (parent.includes(context)) return false;
		}
		return true;
	};
}
