import { isLifecycle } from '@src/userConfigs/UserManifestConfigs/Parts/Lifecycle';
import { getArgumentCases } from '@tests/argumentCases';

describe('isLifecycle', () => {
	it('is defined', () => {
		expect(isLifecycle).toBeDefined;
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => isLifecycle(badArgument)).toThrowError(
				`Validation Error: dispatchInfo.lifecycle (optional) must be provided as a Lifecycle (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Lifecycle), ${errorMessage} received`,
			);
		},
	);
	const lifecycleStartOnCases = getArgumentCases(['undefined', 'string'], {
		good: [['an array of strings', ['someStart1', 'someStart2']]],
	});
	test.each(lifecycleStartOnCases.bad)(
		'throws when given %s as lifecycle.startOn',
		(description, startOn, errorMessage) => {
			expect(() => {
				isLifecycle({ startOn });
			}).toThrowError(
				`Validation Error: dispatchInfo.lifecycle.startOn (optional) must be provided as a StartEvent or array of StartEvent (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#StartEvent), ${errorMessage} received`,
			);
		},
	);

	test.each(lifecycleStartOnCases.good)(
		'returns true when given %s as lifecycle.startOn',
		(description, startOn) => {
			expect(isLifecycle({ startOn })).toBeTruthy();
		},
	);
	const badLifecycleStartOnCases: [string, any, string][] = [
		[
			'an array of numbers',
			[3, 5, 6],
			[
				'Validation Error: dispatchInfo.lifecycle.startOn[0] (optional) must be provided as a StartEvent (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#StartEvent), 3 (number) received',
				'Validation Error: dispatchInfo.lifecycle.startOn[1] (optional) must be provided as a StartEvent (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#StartEvent), 5 (number) received',
				'Validation Error: dispatchInfo.lifecycle.startOn[2] (optional) must be provided as a StartEvent (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#StartEvent), 6 (number) received',
			].join('\n\n'),
		],
		[
			'an array containing one bad value',
			['someStart1', false, 'someStart2'],
			'Validation Error: dispatchInfo.lifecycle.startOn[1] (optional) must be provided as a StartEvent (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#StartEvent), false (boolean) received',
		],
	];
	test.each(badLifecycleStartOnCases)(
		'throws when given %s as lifecycle.startOn and specify wich of an array is problematic',
		(description, startOn, errorMessage) => {
			expect(() => {
				isLifecycle({ startOn });
			}).toThrowError(errorMessage);
		},
	);
});
