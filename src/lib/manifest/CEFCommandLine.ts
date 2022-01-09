import { XMLElement } from './XMLElement';
import { Command, isValidCommand } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';
import { contextContainsOneOf } from './Context';

export type CEFCommandLineArgument = Command | Command[];

const isCEFCommandLineArgument: (commands: any) => boolean = (commands): commands is CEFCommandLineArgument => {
	if (commands === undefined || !(commands instanceof Array))
		throw new Error(badArgumentError('cefParams', 'a Command (type) or an array of Commands (type)', commands));

	for (const command of commands) {
		if (!isValidCommand(command))
			throw new Error(badArgumentError('cefParams', 'a Command (type) or an array of Command (type)', command));
	}
	return true;
};
export class CEFCommandLine extends XMLElement {
	constructor(commands: CEFCommandLineArgument) {
		commands = typeof commands === 'string' ? [commands] : commands;
		if (isCEFCommandLineArgument(commands)) {
			let content = [];
			if (typeof commands === 'string') commands = [commands];
			for (const command of commands) {
				content.push(new Parameter(command));
			}
			super({ name: 'CEFCommandLine', content });
		}
	}
}
class Parameter extends XMLElement {
	constructor(commandParameter: Command) {
		super({
			name: 'Parameter',
			content: { value: commandParameter, context: contextContainsOneOf('CEFCommandLine') },
		});
	}
}
