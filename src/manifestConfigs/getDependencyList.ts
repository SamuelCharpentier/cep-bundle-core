import { AllDependencies as UserAllDependencies } from '@src/userConfigs/AllDependencies';
import { ManifestConfigs } from './convertToManifestConfigs';

export function getDependencyList(
	userDependencyList: UserAllDependencies | undefined,
): ManifestConfigs['extensions'][0]['dependencyList'] {
	if (userDependencyList === undefined) return undefined;
	const dependencyList: ManifestConfigs['extensions'][0]['dependencyList'] =
		[];
	userDependencyList =
		userDependencyList instanceof Array
			? userDependencyList
			: [userDependencyList];
	userDependencyList.forEach((dependency) => {
		dependencyList.push(dependency);
	});
	return dependencyList;
}
