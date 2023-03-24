export function needsValidation(
	value: any,
	partial: { partial: boolean },
	optional: boolean = false,
): boolean {
	return (
		!(optional && value === undefined) &&
		((partial && value !== undefined) || !partial)
	);
}
