import { getPkgCEP } from '../getPkgCEP';
import type { CompileOptions, ConfigStructure } from '../typesAndValidators';

export function getPkgCompileOptions(root?: string): Partial<ConfigStructure> {
	const cep = getPkgCEP(root);
	if (cep.compileOptions === undefined) {
		return {};
	}
	return { compileOptions: getPkgCEP(root).compileOptions };
}
