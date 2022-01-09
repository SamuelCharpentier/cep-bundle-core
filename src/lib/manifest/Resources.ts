import { XMLElement } from './XMLElement';
import { MainPath } from './MainPath';
import { ScriptPath } from './ScriptPath';
import { CEFCommandLine, CEFCommandLineArgument } from './CEFCommandLine';
import { RelativePath } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

export type ResourcesArgument = {
	mainPath?: RelativePath;
	scriptPath?: RelativePath;
	cefParams?: CEFCommandLineArgument;
};

const isResourcesArgument: (arg: any) => arg is ResourcesArgument = (arg): arg is ResourcesArgument => {
	if (
		typeof arg === 'object' &&
		(arg.mainPath !== undefined || arg.scriptPath !== undefined || arg.cefParams !== undefined)
	)
		return true;
	throw new Error(badArgumentError('resources', 'ResourcesArgument (type)', arg));
};
export class Resources extends XMLElement {
	constructor(arg: ResourcesArgument) {
		if (isResourcesArgument(arg)) {
			const { mainPath, scriptPath, cefParams } = arg;
			let content: XMLElement[] = [];
			if (mainPath !== undefined) content.push(new MainPath(mainPath));
			if (scriptPath !== undefined) content.push(new ScriptPath(scriptPath));
			if (cefParams !== undefined) content.push(new CEFCommandLine(cefParams));
			super({ name: 'Resources', content });
		}
	}
}
