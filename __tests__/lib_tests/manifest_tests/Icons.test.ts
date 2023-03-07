import { Icons, IconsArgument } from '@manifest/Icons';

describe('Icons', () => {
	it('Is defined', () => {
		expect(Icons).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates empty constructor', () => {
		expect(() => {
			new Icons(badArgument);
		}).toThrowError(
			'Validation Error: Icon must be provided as IconsArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates an argument other than an object', () => {
		badArgument = 'hello';
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			"Validation Error: Icon must be provided as IconsArgument (type), 'hello' (string) received",
		);
		badArgument = ['hello'];
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			'Validation Error: Icon must be provided as IconsArgument (type), \n["hello"]\n(array) received',
		);
		badArgument = 155;
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			'Validation Error: Icon must be provided as IconsArgument (type), 155 (number) received',
		);
	});
	it('Invalidates an empty object', () => {
		badArgument = {};
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			'Validation Error: Icon must be provided as IconsArgument (type), \n{}\n(object) received',
		);
	});
	it('Invalidates keys other than IconType (enum)', () => {
		badArgument = { someWrongKeyName: 255 };
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			"Validation Error: Each icon keys must be provided as IconType (enum), 'someWrongKeyName' (string) received",
		);
	});
	it('Invalidates a RelativePath other than string', () => {
		badArgument = {
			normal: 35,
		};
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			'Validation Error: Normal icon path must be provided as a RelativePath (type), 35 (number) received',
		);
		badArgument = {
			normal: true,
		};
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			'Validation Error: Normal icon path must be provided as a RelativePath (type), true (boolean) received',
		);

		badArgument = {
			normal: ['./my/img/normal-icon.png'],
		};
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			'Validation Error: Normal icon path must be provided as a RelativePath (type), \n["./my/img/normal-icon.png"]\n(array) received',
		);
	});
	it('Invalidates an empty RelativePath', () => {
		badArgument = {
			normal: '',
		};
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			"Validation Error: Normal icon path must be provided as a RelativePath (type), '' (string) received",
		);
	});
	it('Invalidates a bad RelativePath', () => {
		badArgument = {
			normal: 'my/img/normal-icon.png',
		};
		expect(() => {
			new Icons(badArgument);
		}).toThrow(
			"Validation Error: Normal icon path must be provided as a RelativePath (type), 'my/img/normal-icon.png' (string) received",
		);
	});
	let validArgument: IconsArgument;
	it('Validates valid RelativePath', () => {
		validArgument = {
			normal: './my/img/normal-icon.png',
		};
		expect(() => {
			new Icons(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		validArgument = {
			normal: './my/img/normal-icon.png',
		};
		expect(new Icons(validArgument).xml()).toEqual(
			'<Icons>\n\t<Icon Type="Normal">./my/img/normal-icon.png</Icon>\n</Icons>\n',
		);
		validArgument = {
			normal: './my/img/normal-icon.png',
			disabled: './my/img/disabled-icon.png',
		};
		expect(new Icons(validArgument).xml()).toEqual(
			'<Icons>\n\t<Icon Type="Normal">./my/img/normal-icon.png</Icon>\n\t<Icon Type="Disabled">./my/img/disabled-icon.png</Icon>\n</Icons>\n',
		);
	});
});
