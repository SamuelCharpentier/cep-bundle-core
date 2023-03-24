import { getPkgCEP } from '@src/userConfigs/getPkgCEP';

export function getPkgCompileOptions(root?: string): {
	[key: string | number | symbol]: any;
} {
	const cep = getPkgCEP(root);
	if (cep.compileOptions === undefined) {
		return {};
	}
	return cep.compileOptions;
}
