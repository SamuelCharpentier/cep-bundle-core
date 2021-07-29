import { XMLElement } from './XMLElement';
import { VersionNumber, AttributeArgument, isNumeric } from './typesAndValidators';
export class DependencyList extends XMLElement {
	constructor(dependencies: Dependency | Dependency[]) {
		if (dependencies instanceof Dependency) dependencies = [dependencies];
		for (const dependency of dependencies) {
			if (!(dependencies instanceof Dependency))
				throw new Error(
					badArgumentError("Every DependencyList's dependencies", 'instances of Dependency', dependency),
				);
		}
		super({ name: 'DependencyList', content: dependencies });
	}
}
export class Dependency extends XMLElement {
	constructor(id: string, version?: VersionNumber) {
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
