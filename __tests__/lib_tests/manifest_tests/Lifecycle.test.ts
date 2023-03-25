import { Lifecycle, LifecycleArgument } from '@manifest/Lifecycle';

describe('Lifecycle', () => {
	it('Is defined', () => {
		expect(Lifecycle).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow();
	});

	let validArgument: LifecycleArgument;

	it('Validates valid argument', () => {
		validArgument = {
			autoVisible: true,
			startOn: [
				'applicationActivate',
				'com.adobe.csxs.events.ApplicationActivate',
			],
		};
		expect(() => {
			new Lifecycle(validArgument);
		}).not.toThrow();
		expect(() => {
			validArgument = {
				autoVisible: false,
				startOn: ['applicationActivate'],
			};
			new Lifecycle(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		validArgument = {
			autoVisible: true,
			startOn: [
				'applicationActivate',
				'com.adobe.csxs.events.ApplicationActivate',
			],
		};
		expect(new Lifecycle(validArgument).xml()).toEqual(
			'<Lifecycle>\n\t<AutoVisible>true</AutoVisible>\n\t<StartOn>\n\t\t<Event>applicationActivate</Event>\n\t\t<Event>com.adobe.csxs.events.ApplicationActivate</Event>\n\t</StartOn>\n</Lifecycle>\n',
		);
	});
});
