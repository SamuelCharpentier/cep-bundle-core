import { XMLElement } from './XMLElement';
import { VersionNumber, AttributeArgument, isNumeric } from './typesAndValidators';
import { badArgumentError } from './errorMessages';
export class DependencyList extends XMLElement {
	constructor(dependencies: DependencyArgument | DependencyArgument[]) {
		if (!(dependencies instanceof Array)) dependencies = [dependencies];
		let content: Dependency[] = [];
		for (const dependency of dependencies) {
			if (!isDependencyArgument(dependencies))
				throw new Error(
					badArgumentError("Every DependencyList's dependencies", 'instances of Dependency', dependency),
				);
			else content.push(new Dependency(dependency));
		}
		super({ name: 'DependencyList', content });
	}
}

export type DependencyArgument = { id: string; version?: VersionNumber };

export const isDependencyArgument: (arg: any) => boolean = (argument) => {
	return false;
};
class Dependency extends XMLElement {
	constructor({ id, version }: DependencyArgument) {
		if (id) {
			let attributes: AttributeArgument[] = [];
			if (typeof id !== 'string') throw new Error(badArgumentError("Dependency's Id", 'string', id));
			attributes.push({ name: 'Id', value: id });
			if (version)
				if (typeof version !== 'string' || !isNumeric(version))
					throw new Error(
						badArgumentError(
							"Dependency's Version(optional)",
							'string containing a version number',
							version,
						),
					);
				else attributes.push({ name: 'version', value: version });
			super({ name: 'Dependency', attributes });
		} else throw new Error(badArgumentError("Dependency's Id", 'string', id));
	}
}
