import { XMLElement } from './XMLElement';
import { Command, isValidCommand } from './typesAndValidators';
import { StringContent } from './StringContent';
import { contextContainsOneOf } from './Context';
export class CEFCommandLine extends XMLElement {
	constructor(commandParameters: Command | Command[]) {
		let content = [];
		commandParameters = typeof commandParameters === 'string' ? [commandParameters] : commandParameters;
		for (const command of commandParameters) {
			if (!isValidCommand(command))
				throw new Error(
					badArgumentError(
						'CEF Command Line command parameters',
						'string of type Command or an array of strings of type Command',
						commandParameters,
					),
				);
			content.push(new Parameter(command));
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
