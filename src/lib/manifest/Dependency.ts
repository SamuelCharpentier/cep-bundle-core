import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';
import { VersionNumber, isVersionNumber } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

export type DependencyListArgument = DependencyArgument | DependencyArgument[];

function isDependencyListArgument(arg: any): arg is DependencyListArgument {
	if (typeof arg !== 'object')
		throw new Error(
			badArgumentError(
				'dependencyList',
				'a DependencyArgument (type) or an array of DependencyArgument (type)',
				arg,
			),
		);
	arg = !(arg instanceof Array) ? [arg] : arg;
	for (let dependencyArg of arg) {
		isDependencyArgument(dependencyArg);
	}
	return true;
}
export class DependencyList extends XMLElement {
	constructor(dependencies: DependencyListArgument) {
		isDependencyListArgument(dependencies);
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

function isDependencyArgument(arg: any): arg is DependencyArgument {
	if (typeof arg !== 'object') {
		throw new Error(
			badArgumentError(
				'every dependencyList elements',
				'a DependencyArgument (type)',
				arg,
			),
		);
	}
	if (arg.id === undefined || typeof arg.id !== 'string') {
		throw new Error(
			badArgumentError('dependencyList[].id', 'a string', arg.id),
		);
	}
	if (arg.version !== undefined && !isVersionNumber(arg.version)) {
		throw new Error(
			badArgumentError(
				'dependencyList[].version (optional)',
				'a VersionNumber (type)',
				arg.version,
			),
		);
	}
	return true;
}
class Dependency extends XMLElement {
	constructor({ id, version }: DependencyArgument) {
		let attributes: AttributeArgument[] = [{ name: 'Id', value: id }];
		if (version) attributes.push({ name: 'version', value: version });
		super({ name: 'Dependency', attributes });
	}
}
