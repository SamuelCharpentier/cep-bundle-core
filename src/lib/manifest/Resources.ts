import { XMLElement } from './XMLElement';
import { MainPath, isMainPathArgument } from './MainPath';
import { isScriptPathArgument, ScriptPath } from './ScriptPath';
import { CEFCommandLine, CEFCommandLineArgument, isCEFCommandLineArgument } from './CEFCommandLine';
import { RelativePath, isRelativePath, isValidCommand } from '../typesAndValidators';

export type ResourcesArgument = {
	mainPath?: RelativePath;
	scriptPath?: RelativePath;
	cefParams?: CEFCommandLineArgument;
};

export const isResourcesArgument: (argument: any) => boolean = (argument) => {
	if (argument && typeof argument === 'object') {
		if (argument.mainPath) isMainPathArgument(argument.mainPath);
		if (argument.scriptPath) isScriptPathArgument(argument.scriptPath);
		if (argument.cefParams) isCEFCommandLineArgument(argument.cefParams);
		return false;
	}
	return false;
};
export class Resources extends XMLElement {
	constructor({ mainPath, scriptPath, cefParams }: ResourcesArgument = {}) {
		let content: XMLElement[] = [];
		if (mainPath !== undefined && isRelativePath(mainPath)) content.push(new MainPath(mainPath));
		if (scriptPath !== undefined && isRelativePath(scriptPath)) content.push(new ScriptPath(scriptPath));
		if (cefParams !== undefined && isValidCommand(cefParams)) content.push(new CEFCommandLine(cefParams));
		super({ name: 'Resources', content });
	}
}
