import { XMLElement } from './XMLElement';
import { MainPath } from './MainPath';
import { ScriptPath } from './ScriptPath';
import { CEFCommandLine } from './CEFCommandLine';
export class Resources extends XMLElement {
	constructor({
		mainPath,
		scriptPath,
		cefCommandLine,
	}: { mainPath?: MainPath; scriptPath?: ScriptPath; cefCommandLine?: CEFCommandLine } = {}) {
		let content: XMLElement[] = [];
		if (mainPath !== undefined && mainPath instanceof MainPath) content.push(mainPath);
		if (scriptPath !== undefined && scriptPath instanceof ScriptPath) content.push(scriptPath);
		if (cefCommandLine !== undefined && cefCommandLine instanceof CEFCommandLine) content.push(cefCommandLine);
		super({ name: 'Resources', content });
	}
}
