import { DeepPartial } from '../deepPartial';
import { getPkgCEP } from '../getPkgCEP';
import type { CompileOptions, ConfigStructure } from '../typesAndValidators';

export function getPkgCompileOptions(
	root?: string,
): DeepPartial<CompileOptions> {
	const cep = getPkgCEP(root);
	if (cep.compileOptions === undefined) {
		return {};
	}
	return cep.compileOptions;
}
