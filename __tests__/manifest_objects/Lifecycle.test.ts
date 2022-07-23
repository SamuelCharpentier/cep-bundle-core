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
	it('Invalidates an argument other than an object', () => {
		badArgument = 'hello';
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			"Validation Error: lifecycle must be provided as LifecycleArgument (type), 'hello' (string) received",
		);
		badArgument = ['hello'];
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: lifecycle must be provided as LifecycleArgument (type), \n["hello"]\n (array) received',
		);
		badArgument = 155;
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: lifecycle must be provided as LifecycleArgument (type), 155 (number) received',
		);
	});
	it('Invalidates an empty object argument', () => {
		badArgument = {};
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: lifecycle must be provided as LifecycleArgument (type), \n{}\n (object) received',
		);
	});
	it('Invalidates bad autoVisible argument', () => {
		badArgument = { autoVisible: 'hello' };
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			"Validation Error: autoVisible must be provided as a Boolean (type), 'hello' (string) received",
		);
		badArgument = { autoVisible: 42 };
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: autoVisible must be provided as a Boolean (type), 42 (number) received',
		);
		badArgument = { autoVisible: ['hello'] };
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: autoVisible must be provided as a Boolean (type), \n["hello"]\n (array) received',
		);
		badArgument = { autoVisible: { value: true } };
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: autoVisible must be provided as a Boolean (type), \n{ "value": true }\n (object) received',
		);
	});
	it('Invalidates bad startOn argument', () => {
		badArgument = { startOn: 42 };
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: startOn Events must be provided as an EventType (type), 42 (number) received',
		);
		badArgument = { startOn: { value: true } };
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: startOn Events must be provided as an EventType (type), \n{ "value": true }\n (object) received',
		);
		badArgument = { startOn: ['event', 42, 55] };
		expect(() => {
			new Lifecycle(badArgument);
		}).toThrow(
			'Validation Error: startOn Events must be provided as an EventType (type), 42 (number) received',
		);
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
				startOn: 'applicationActivate',
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
