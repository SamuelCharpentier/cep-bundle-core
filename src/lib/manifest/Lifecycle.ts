import { XMLElement } from './XMLElement';
import { StartEvent, isStartEvent } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

export type LifecycleArgument = {
	autoVisible?: boolean;
	startOn?: StartEvent[];
};
export class Lifecycle extends XMLElement {
	constructor(arg: LifecycleArgument) {
		let content: XMLElement[] = [];
		const { autoVisible, startOn } = arg;
		if (autoVisible !== undefined)
			content.push(new AutoVisible(autoVisible));
		if (startOn !== undefined) content.push(new StartOn(startOn));
		super({ name: 'Lifecycle', content });
	}
}
class AutoVisible extends XMLElement {
	constructor(state?: boolean) {
		super({ name: 'AutoVisible', content: state ? 'true' : 'false' });
	}
}

class StartOn extends XMLElement {
	constructor(events: StartEvent | StartEvent[]) {
		events = !(events instanceof Array) ? [events] : events;
		let content: XMLElement[] = [];
		for (const event of events) {
			content.push(new XMLElement({ name: 'Event', content: event }));
		}
		super({ name: 'StartOn', content });
	}
}
