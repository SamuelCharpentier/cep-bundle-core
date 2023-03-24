import { StartEvent, isStartEvent } from '@src/lib/typesAndValidators';
import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';

export type Lifecycle = {
	startOn: StartEvent | StartEvent[];
};

export const isLifecycle = (
	received: any,
	parents: string[] = ['dispatchInfo'],
): received is Lifecycle => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents, `lifecycle`].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'Lifecycle',
			)}`,
			received,
		});
	}
	parents.push('lifecycle');
	let cumulatedErrors: string[] = [];
	if (received.startOn !== undefined) {
		const startOnIsArray = received.startOn instanceof Array;
		if (startOnIsArray && received.startOn.length === 0) {
			throw badValueError({
				propertyName: [...parents, `startOn`].join('.'),
				expectedPropertyType: `a StartEvent or array of ${linkToDocs(
					'general type',
					'StartEvent',
				)}`,
				received: received.startOn,
			});
		}
		const startOn = startOnIsArray ? received.startOn : [received.startOn];
		for (const index in startOn) {
			const event = startOn[index];
			if (!isStartEvent(event))
				cumulatedErrors.push(
					badValueError({
						propertyName: [
							...parents,
							`startOn${startOnIsArray ? `[${index}]` : ''}`,
						].join('.'),
						expectedPropertyType: `a${
							!startOnIsArray ? ` StartEvent or array of` : ''
						} ${linkToDocs('general type', 'StartEvent')}`,
						received: event,
					}),
				);
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
