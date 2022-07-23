import { UI, UIArgument } from '@manifest/UI';

describe('UI', () => {
	it('Is defined', () => {
		expect(UI).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates empty constructor', () => {
		expect(() => {
			new UI(badArgument);
		}).toThrowError(
			'Validation Error: ui must be provided as UIArgument (interface), undefined (undefined) received',
		);
	});
	it('Invalidates an argument other than an object', () => {
		badArgument = 'hello';
		expect(() => {
			new UI(badArgument);
		}).toThrow(
			"Validation Error: ui must be provided as UIArgument (interface), 'hello' (string) received",
		);
		badArgument = ['hello'];
		expect(() => {
			new UI(badArgument);
		}).toThrow(
			'Validation Error: ui must be provided as UIArgument (interface), \n["hello"]\n (array) received',
		);
		badArgument = 155;
		expect(() => {
			new UI(badArgument);
		}).toThrow(
			'Validation Error: ui must be provided as UIArgument (interface), 155 (number) received',
		);
	});
	it('Invalidates an empty object', () => {
		badArgument = {};
		expect(() => {
			new UI(badArgument);
		}).toThrow(
			'Validation Error: ui must be provided as UIArgument (interface), \n{}\n (object) received',
		);
	});
	let validArgument: UIArgument = {
		geometry: {
			maxSize: { width: 100, height: 100 },
			minSize: { width: 10, height: 10 },
		},
		icons: {
			normal: './icons/noraml-icon.png',
			darkNormal: './icons/dark-normal-icon.png',
			disabled: './icons/disabled-icon.png',
			rollOver: './icons/rollOver-icon.png',
			darkRollOver: './icons/dark-rollOver-icon.png',
		},
		menu: {
			menuName: 'Menu',
		},
		type: 'Panel',
	};
	it('Validates valid argument', () => {
		expect(() => {
			new UI(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		expect(new UI(validArgument).xml()).toEqual(
			'<UI>\n\t<Type>Panel</Type>\n\t<Menu>Menu</Menu>\n\t<Geometry>\n\t\t<MaxSize>\n\t\t\t<Width>100</Width>\n\t\t\t<Height>100</Height>\n\t\t</MaxSize>\n\t\t<MinSize>\n\t\t\t<Width>10</Width>\n\t\t\t<Height>10</Height>\n\t\t</MinSize>\n\t</Geometry>\n\t<Icons>\n\t\t<Icon Type="Normal">./icons/noraml-icon.png</Icon>\n\t\t<Icon Type="DarkNormal">./icons/dark-normal-icon.png</Icon>\n\t\t<Icon Type="Disabled">./icons/disabled-icon.png</Icon>\n\t\t<Icon Type="RollOver">./icons/rollOver-icon.png</Icon>\n\t\t<Icon Type="DarkRollOver">./icons/dark-rollOver-icon.png</Icon>\n\t</Icons>\n</UI>\n',
		);
	});
});
