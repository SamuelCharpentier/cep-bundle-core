import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';
import { VersionNumber, isVersionNumber } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

export type DependencyListArgument = DependencyArgument | DependencyArgument[];

export class DependencyList extends XMLElement {
	constructor(dependencies: DependencyListArgument) {
		dependencies = !(dependencies instanceof Array)
			? [dependencies]
			: dependencies;
		let content: Dependency[] = [];
		for (const dependency of dependencies) {
			content.push(new Dependency(dependency));
		}
		super({ name: 'DependencyList', content });
	}
}

type DependencyArgument = {
	id: string;
	version?: VersionNumber;
};

class Dependency extends XMLElement {
	constructor({ id, version }: DependencyArgument) {
		let attributes: AttributeArgument[] = [{ name: 'Id', value: id }];
		if (version)
			attributes.push({ name: 'version', value: String(version) });
		super({ name: 'Dependency', attributes });
	}
}
