export function needsValidation(
	value: any,
	partial: { partial: boolean } = { partial: false },
	optional: boolean = false,
): boolean {
	return (
		!(optional && value === undefined) &&
		((partial.partial && value !== undefined) || !partial)
	);
}
