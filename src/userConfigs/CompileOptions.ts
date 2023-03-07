export type CompileOptions = { [key: string]: any };

export const isCompileOptions = (val: any): val is CompileOptions => {
	console.warn('isCompileOptions is not implemented yet');
	return typeof val === 'object' && val !== null;
};
