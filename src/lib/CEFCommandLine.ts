import { XMLElement } from './XMLElement';
import { Command, isValidCommand } from './typesAndValidators';
import { StringContent } from './StringContent';
import { badArgumentError } from './errorMessages';
import { contextContainsOneOf } from './Context';

export type CEFCommandLineArgument = Command | Command[];

export const isCEFCommandLineArgument: (args: any) => boolean = (args): args is CEFCommandLineArgument => {
	if (args && (typeof args === 'string' || (typeof args === 'object' && args instanceof Array))) {
		if (!(args instanceof Array)) args = [args];
		for (const arg of args) {
			if (!isValidCommand(arg))
				throw new Error(
					badArgumentError(
						'extension.dispatchInfo.resources.cefParams',
						'a string or array of string of valid Command(type)',
						arg,
					),
				);
		}
		return true;
	}
	return false;
};
export class CEFCommandLine extends XMLElement {
	constructor(commandParameters: CEFCommandLineArgument) {
		let content = [];
		if (isCEFCommandLineArgument(commandParameters)) {
			if (typeof commandParameters === 'string') commandParameters = [commandParameters];
			for (const command of commandParameters) {
				content.push(new Parameter(command));
			}
		}
		super({ name: 'CEFCommandLine', content });
	}
}
export class Parameter extends XMLElement {
	constructor(commandParameter: Command) {
		super({
			name: 'Parameter',
			content: new StringContent({ value: commandParameter, context: contextContainsOneOf('CEFCommandLine') }),
		});
	}
}
