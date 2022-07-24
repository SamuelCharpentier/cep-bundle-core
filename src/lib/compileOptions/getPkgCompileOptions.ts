import { getPkgCEP } from '../getPkgCEP';
import type { CompileOptions } from '../typesAndValidators';

export function getPkgCompileConfig(root?: string): Partial<CompileOptions> {
	return getPkgCEP(root).compileOptions || {};
}
