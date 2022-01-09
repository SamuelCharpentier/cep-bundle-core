import { XMLElement } from './XMLElement';
import { EventType, isEvent } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

export type LifecycleArgument = { autoVisible?: boolean; startOn?: EventType | EventType[] };

export const isLifecycleArgument: (arg: any) => boolean = (arg): arg is LifecycleArgument => {
	if (typeof arg === 'object' && (arg.autoVisible !== undefined || arg.startOn !== undefined)) return true;
	throw new Error(badArgumentError('lifecycle', 'LifecycleArgument (type)', arg));
};
export class Lifecycle extends XMLElement {
	constructor(arg: LifecycleArgument) {
		if (isLifecycleArgument(arg)) {
			let content: XMLElement[] = [];
			const { autoVisible, startOn } = arg;
			if (autoVisible !== undefined) content.push(new AutoVisible(autoVisible));
			if (startOn !== undefined) content.push(new StartOn(startOn));
			super({ name: 'Lifecycle', content });
		}
	}
}

const isAutoVisibleArgument = (arg: any): arg is { autoVisible: boolean } => {
	if (typeof arg !== 'boolean') throw new Error(badArgumentError('autoVisible', 'a Boolean (type)', arg));
	return true;
};
class AutoVisible extends XMLElement {
	constructor(state?: boolean) {
		isAutoVisibleArgument(state);
		super({ name: 'AutoVisible', content: state ? 'true' : 'false' });
	}
}
const isEventElementArgument = (arg: any): arg is { event: EventType } => {
	if (!isEvent(arg)) throw new Error(badArgumentError('startOn Events', 'an EventType (type)', arg));
	return true;
};

class StartOn extends XMLElement {
	constructor(events: EventType | EventType[]) {
		events = !(events instanceof Array) ? [events] : events;
		let content: XMLElement[] = [];
		for (const event of events) {
			isEventElementArgument(event);
			content.push(new XMLElement({ name: 'Event', content: event }));
		}
		super({ name: 'StartOn', content });
	}
}
