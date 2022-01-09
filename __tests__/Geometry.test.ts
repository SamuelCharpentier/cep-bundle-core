import { Geometry, GeometryArgument } from '@manifest/Geometry';
import { SizesTypes } from '@src/lib/manifest/enumsAndValidators';

describe('Geometry', () => {
	it('Is defined', () => {
		expect(Geometry).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates an empty argument', () => {
		expect(() => {
			new Geometry(badArgument);
		}).toThrow(
			'Validation Error: geometry must be provided as GeometryArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates an argument other than an object', () => {
		badArgument = 'hello';
		expect(() => {
			new Geometry(badArgument);
		}).toThrow("Validation Error: geometry must be provided as GeometryArgument (type), 'hello' (string) received");
		badArgument = ['hello'];
		expect(() => {
			new Geometry(badArgument);
		}).toThrow(
			'Validation Error: geometry must be provided as GeometryArgument (type), \n["hello"]\n (array) received',
		);
		badArgument = 155;
		expect(() => {
			new Geometry(badArgument);
		}).toThrow('Validation Error: geometry must be provided as GeometryArgument (type), 155 (number) received');
	});
	it('Invalidates an empty object', () => {
		badArgument = {};
		expect(() => {
			new Geometry(badArgument);
		}).toThrow('Validation Error: geometry must be provided as GeometryArgument (type), \n{}\n (object) received');
	});
	it('Invalidates keys other than SizesTypes (enum)', () => {
		badArgument = { someWrongKeyName: 255 };
		expect(() => {
			new Geometry(badArgument);
		}).toThrow(
			"Validation Error: Each geometry keys must be provided as as a SizesTypes (enum), 'someWrongKeyName' (string) received",
		);
	});
	it('Invalidates an empty SizeType', () => {
		badArgument = {
			size: {},
		};
		expect(() => {
			new Geometry(badArgument);
		}).toThrow(
			'Validation Error: Geometry size must be provided as as a WidthHeight (interface), \n{}\n (object) received',
		);
	});
	it('Invalidates bad value to key', () => {
		badArgument = {
			size: {
				width: 'hello',
				height: 'hello',
			},
		};
		expect(() => {
			new Geometry(badArgument);
		}).toThrow(
			"Validation Error: Geometry size width must be provided as as a number or a string of a number, 'hello' (string) received",
		);
		badArgument = {
			size: {
				width: '250',
				height: 'hello',
			},
		};
		expect(() => {
			new Geometry(badArgument);
		}).toThrow(
			"Validation Error: Geometry size height must be provided as as a number or a string of a number, 'hello' (string) received",
		);
	});
	it('Validates valid MenuArgument type', () => {
		let goodArgument: GeometryArgument = {
			size: {
				width: 250,
				height: 250,
			},
		};
		expect(() => {
			new Geometry(goodArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		let goodArgument: GeometryArgument = {
			size: {
				width: 250,
				height: 250,
			},
		};
		expect(new Geometry(goodArgument).xml(['Dependency'])).toBe(
			'<Geometry>\n\t<Size>\n\t\t<Width>250</Width>\n\t\t<Height>250</Height>\n\t</Size>\n</Geometry>\n',
		);
		goodArgument = {
			maxSize: {
				width: '250',
				height: '250',
			},
		};
		expect(new Geometry(goodArgument).xml(['Dependency'])).toBe(
			'<Geometry>\n\t<MaxSize>\n\t\t<Width>250</Width>\n\t\t<Height>250</Height>\n\t</MaxSize>\n</Geometry>\n',
		);
	});
});
