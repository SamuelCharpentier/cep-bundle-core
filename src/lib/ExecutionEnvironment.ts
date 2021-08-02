import { XMLElement } from './XMLElement';
import { HostArgument, HostList, isValidHostArgument } from './Host';
import { LocaleList, LocaleListArgument, isLocaleListArgument } from './LocaleList';
import { badArgumentError } from './errorMessages';

export type ExecutionEnvironmentArgument = { hostList?: HostArgument; localeList?: LocaleListArgument };

export const isExecutionEnvironmentArgument = <(argument: any) => argument is ExecutionEnvironmentArgument>((
	argument,
) => {
	if (typeof argument === 'object' && (argument.hostList || argument.localeList)) {
		if (argument.hostList && !isValidHostArgument(argument.hostList))
			throw new Error(
				badArgumentError(
					'executionEnvironment.hostList',
					'as an object of type HostArgument(type)',
					argument.hostList,
				),
			);
		if (argument.localeList && !isLocaleListArgument(argument.localeList))
			throw new Error(
				badArgumentError(
					'executionEnvironment.localeList',
					'as an object of type LocaleListArgument(type)',
					argument.localeList,
				),
			);
		return true;
	}
	throw new Error('executionEnvironment could not be validated');

	return false;
});
export class ExecutionEnvironment extends XMLElement {
	constructor(executionEnvironmentConfig: ExecutionEnvironmentArgument = {}) {
		if (isExecutionEnvironmentArgument(executionEnvironmentConfig)) {
			const { hostList, localeList } = executionEnvironmentConfig;
			let content: XMLElement[] = [];
			if (hostList) content.push(new HostList(hostList));
			if (localeList) content.push(new LocaleList(localeList));
			super({ name: 'ExecutionEnvironment', content });
		}
	}
}
