import { XMLElement } from './XMLElement';
import { HostList } from './Host';
import { LocaleList } from './LocaleList';
export class ExecutionEnvironment extends XMLElement {
	constructor(hostList: HostList, localeList: LocaleList) {
		super({ name: 'ExecutionEnvironment', content: [hostList, localeList] });
	}
}
