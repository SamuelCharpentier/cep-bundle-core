import { XMLElement } from './XMLElement';
import { HostArgument, HostList, isValidHostArgument } from './Host';
import { LocaleList, LocaleListArgument, isLocaleListArgument } from './LocaleList';
import { badArgumentError } from './errorMessages';

export type ExecutionEnvironmentArgument = { hostList?: HostArgument; localeList?: LocaleListArgument };

export const isExecutionEnvironmentArgument: (arg: any) => boolean = (argument) => {
	if (
		typeof argument === 'object' &&
		(isValidHostArgument(argument.hostList) || isLocaleListArgument(argument.localeList))
	)
		return true;
	return false;
};
export class ExecutionEnvironment extends XMLElement {
	constructor({ hostList, localeList }: ExecutionEnvironmentArgument = {}) {
		if (hostList || localeList) {
			let content: XMLElement[] = [];
			if (hostList)
				if (!(hostList instanceof HostList))
					throw new Error(badArgumentError("Execution Environment's HostList(optional)", '', hostList));
				else content.push(hostList);
			if (localeList)
				if (!(localeList instanceof LocaleList))
					throw new Error(badArgumentError("Execution Environment's LocaleList(optional)", '', localeList));
				else content.push(localeList);
			super({ name: 'ExecutionEnvironment', content });
		} else throw new Error('ExecutionEnvironment requires at least one of its arguments to be defined');
	}
}
