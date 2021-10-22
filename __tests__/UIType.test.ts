import { Type, TypeArgument } from '@manifest/UIType';

describe('Type (UIType.ts)', () => {
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Type(badArgument);
		}).toThrow(
			'Validation Error: Type must be provided as a UIType (enum), `${UIType}` or keyof typeof UIType, undefined (undefined) received',
		);
	});
	it('Invalidates an invalid UI Type argument', () => {
		badArgument = 'Random String';
		expect(() => {
			new Type(badArgument);
		}).toThrow(
			"Validation Error: Type must be provided as a UIType (enum), `${UIType}` or keyof typeof UIType, 'Random String' (string) received",
		);
		badArgument = 33;
		expect(() => {
			new Type(badArgument);
		}).toThrow(
			'Validation Error: Type must be provided as a UIType (enum), `${UIType}` or keyof typeof UIType, 33 (number) received',
		);
		badArgument = { type: 'Panel' };
		expect(() => {
			new Type(badArgument);
		}).toThrow(
			'Validation Error: Type must be provided as a UIType (enum), `${UIType}` or keyof typeof UIType, \n{ "type": "Panel" }\n (object) received',
		);
		badArgument = [];
		expect(() => {
			new Type(badArgument);
		}).toThrow(
			'Validation Error: Type must be provided as a UIType (enum), `${UIType}` or keyof typeof UIType, \n[]\n (array) received',
		);
	});

	it('Validates all valid UI Types', () => {
		let goodArgument: TypeArgument = 'Panel';
		expect(() => {
			new Type(goodArgument);
		}).not.toThrow();
		goodArgument = 'Modeless';
		expect(() => {
			new Type(goodArgument);
		}).not.toThrow();
		goodArgument = 'ModalDialog';
		expect(() => {
			new Type(goodArgument);
		}).not.toThrow();
		goodArgument = 'Embedded';
		expect(() => {
			new Type(goodArgument);
		}).not.toThrow();
		goodArgument = 'Dashboard';
		expect(() => {
			new Type(goodArgument);
		}).not.toThrow();
		goodArgument = 'Custom';
		expect(() => {
			new Type(goodArgument);
		}).not.toThrow();
	});
});
