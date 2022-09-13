export function testBadArguments(
	functionToTest: Function,
	badArguments: any[] = [],
	badValueError: string | Function,
) {
	for (const badArgument of badArguments) {
		expect(() => {
			functionToTest(badArgument);
		}).toThrowError(
			badValueError instanceof Function
				? badValueError(badArgument)
				: badValueError,
		);
	}
}
