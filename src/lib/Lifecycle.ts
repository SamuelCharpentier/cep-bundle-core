import { XMLElement } from './XMLElement';
import { EventType, isEvent } from './typesAndValidators';
import { badArgumentError } from './errorMessages';
export class Lifecycle extends XMLElement {
	constructor({ autoVisible, startOn }: { autoVisible?: AutoVisible; startOn?: StartOn }) {
		let content: XMLElement[] = [];
		if (autoVisible !== undefined && autoVisible instanceof AutoVisible) content.push(autoVisible);
		if (startOn !== undefined && startOn instanceof StartOn) content.push(startOn);
		super({ name: 'Lifecycle', content });
	}
}
export class AutoVisible extends XMLElement {
	constructor(state?: boolean) {
		if (typeof state !== 'boolean')
			throw new Error(badArgumentError('Auto Visible state parameter (optional)', 'boolean', state));

		super({ name: 'AutoVisible', content: state ? 'true' : 'false' });
	}
}
export class StartOn extends XMLElement {
	constructor(events: EventType | EventType[]) {
		events = typeof events === 'string' ? [events] : events;
		if (!isEvent(events))
			throw new Error(
				badArgumentError(
					'Start On events parameter (optional)',
					'string of type Event or an Array of strings of type Event',
					events,
				),
			);
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
