import { XMLElement } from './XMLElement';
import { EventType, isEvent } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

export type LifecycleArgument = { autoVisible?: boolean; startOn?: EventType | EventType[] };

export const isLifecycleArgument: (arg: any) => boolean = (arg): arg is LifecycleArgument => {
	if (arg && typeof arg === 'object') {
		if (arg.autoVisible && typeof arg.autoVisible !== 'boolean') {
			throw new Error(
				badArgumentError('extension.dispatchInfo.lifecycle.autoVisible', 'a boolean', arg.autoVisible),
			);
		}
		if (arg.startOn) {
			if (!(arg.startOn instanceof Array)) arg.startOn = [arg.startOn];
			for (const event of arg.startOn) {
				if (!isEvent(event))
					throw new Error(
						badArgumentError(
							'extension.dispatchInfo.lifecycle.startOn',
							'an string or array of string containing valid EventType(type)',
							event,
						),
					);
			}
		}
		return true;
	}
	return false;
};
export class Lifecycle extends XMLElement {
	constructor(arg: LifecycleArgument) {
		if (isLifecycleArgument(arg)) {
			const { autoVisible, startOn } = arg;
			let content: XMLElement[] = [];
			if (autoVisible) content.push(new AutoVisible(autoVisible));
			if (startOn) content.push(new StartOn(startOn));
			super({ name: 'Lifecycle', content });
		}
	}
}
class AutoVisible extends XMLElement {
	constructor(state?: boolean) {
		if (typeof state !== 'boolean')
			throw new Error(badArgumentError('Auto Visible state parameter (optional)', 'boolean', state));

		super({ name: 'AutoVisible', content: state ? 'true' : 'false' });
	}
}
class StartOn extends XMLElement {
	constructor(events: EventType | EventType[]) {
		events = typeof events === 'string' ? [events] : events;
		let content: XMLElement[] = [];
		for (const event of events) {
			content.push(new EventElement(event));
		}
		super({ name: 'StartOn', content });
	}
}
class EventElement extends XMLElement {
	constructor(event: EventType) {
		super({ name: 'Event', content: event });
	}
}
