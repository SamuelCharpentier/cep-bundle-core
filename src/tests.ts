import { ExtensionManifest } from './lib/ExtensionManifest';
import { Extension } from './lib/Extension';
import { DispatchInfoList, DispatchInfo } from './lib/DispatchInfo';
import { ExtensionList } from './lib/ExtensionList';
import { HostList, Host } from './lib/Host';
import { Resources } from './lib/Resources';
import { MainPath } from './lib/MainPath';
import { ScriptPath } from './lib/ScriptPath';
import { CEFCommandLine } from './lib/CEFCommandLine';
import { Lifecycle } from './lib/Lifecycle';
import { StartOn } from './lib/Lifecycle';
import { UI } from './lib/UI';
import { Type } from './lib/UIType';

let myExt = new Extension({
	id: 'my.extension',
	version: '9',
	hostList: new HostList(new Host('ILLUSTRATOR', '7.2', 9999)),
	dispatchInfo: new DispatchInfo({
		resources: new Resources({
			mainPath: new MainPath('./dst/index.html'),
			scriptPath: new ScriptPath('./scripts/main.jsx'),
			cefCommandLine: new CEFCommandLine(['--parameter1=value1', '--enable-nodejs']),
		}),
		lifecycle: new Lifecycle({
			startOn: new StartOn(['applicationActivate', 'com.adobe.csxs.events.ApplicationActivate']),
		}),
		ui: new UI({ type: new Type('Panel') }),
	}),
});

console.log(
	'<?xml version="1.0" encoding="UTF-8"?>\n' +
		new ExtensionManifest({ bundleId: 'my.bundle', bundleVersion: '0.0.0.1', bundleName: 'Awsome Extensions' }, [
			myExt,
		]).xml(['manifest.xml']),
);
