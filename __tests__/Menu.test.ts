import { Menu, MenuArgument } from '@manifest/Menu';

describe('Menu', () => {
	it('Is defined', () => {
		expect(Menu).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates an empty argument', () => {
		expect(() => {
			new Menu(badArgument);
		}).toThrow(
			'Validation Error: menu must be provided as as a MenuArgument (interface), undefined (undefined) received',
		);
	});

	it('Invalidates an argument other than an object', () => {
		badArgument = 'hello';
		expect(() => {
			new Menu(badArgument);
		}).toThrow(
			"Validation Error: menu must be provided as as a MenuArgument (interface), 'hello' (string) received",
		);
		badArgument = ['hello'];
		expect(() => {
			new Menu(badArgument);
		}).toThrow(
			'Validation Error: menu must be provided as as a MenuArgument (interface), \n["hello"]\n (array) received',
		);
		badArgument = 155;
		expect(() => {
			new Menu(badArgument);
		}).toThrow('Validation Error: menu must be provided as as a MenuArgument (interface), 155 (number) received');
	});

	it("Invalidates a menu name that isn't a string", () => {
		badArgument = { menuName: 123 };
		expect(() => {
			new Menu(badArgument);
		}).toThrow('Validation Error: menu.menuName must be provided as a string, 123 (number) received');
		badArgument = { menuName: ['Hello'] };
		expect(() => {
			new Menu(badArgument);
		}).toThrow('Validation Error: menu.menuName must be provided as a string, \n["Hello"]\n (array) received');
		badArgument = { menuName: { string: 'Hello' } };
		expect(() => {
			new Menu(badArgument);
		}).toThrow(
			'Validation Error: menu.menuName must be provided as a string, \n{ "string": "Hello" }\n (object) received',
		);
	});
	it("Invalidates a placement that isn't a string", () => {
		badArgument = { menuName: 'valid name', placement: 123 };
		expect(() => {
			new Menu(badArgument);
		}).toThrow(
			'Validation Error: menu.placement (optional) must be provided as as a Placement (type), 123 (number) received',
		);
		badArgument = { menuName: 'valid name', placement: [123] };
		expect(() => {
			new Menu(badArgument);
		}).toThrow(
			'Validation Error: menu.placement (optional) must be provided as as a Placement (type), \n[123]\n (array) received',
		);
		badArgument = { menuName: 'valid name', placement: { palcement: 123 } };
		expect(() => {
			new Menu(badArgument);
		}).toThrow(
			'Validation Error: menu.placement (optional) must be provided as as a Placement (type), \n{ "palcement": 123 }\n (object) received',
		);
	});
	test.todo('Validate placement with more specificity');
	it('Validates valid MenuArgument type', () => {
		let goodArgument: MenuArgument;
		goodArgument = { menuName: 'My menu name' };
		expect(() => {
			new Menu(goodArgument);
		}).not.toThrow();
		goodArgument = { menuName: 'My menu name', placement: 'Some placement' };
		expect(() => {
			new Menu(goodArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		let goodArgument: MenuArgument;
		let menuName = 'My menu name';
		goodArgument = { menuName: menuName };
		let myMenu = new Menu(goodArgument);
		expect(myMenu.xml(['Host'])).toBe(`<Menu>${menuName}</Menu>\n`);
	});
});
