import { XMLElement } from './XMLElement';
import { NumberString, isNumeric } from './typesAndValidators';
import { Author } from './Author';
import { Contact } from './Contact';
import { Legal } from './Legal';
import { Abstract } from './Abstract';
import { ExtensionList } from './ExtensionList';
import { ExecutionEnvironment } from './ExecutionEnvironment';
import { DispatchInfoList } from './DispatchInfo';
export class ExtensionManifest extends XMLElement {
	constructor(
		{ bundleId, bundleVersion, bundleName }: { bundleId: string; bundleVersion: NumberString; bundleName?: string },
		content: (Author | Contact | Legal | Abstract | ExtensionList | ExecutionEnvironment | DispatchInfoList)[],
	) {
		let attributes = [{ name: 'Version', value: '7.0' }];
		if (bundleId && typeof bundleId === 'string') attributes.push({ name: 'ExtensionBundleId', value: bundleId });
		else throw new Error(badArgumentError("The bundle's ID", 'string', bundleId));

		if (bundleVersion && (typeof bundleVersion === 'number' || isNumeric(bundleVersion)))
			attributes.push({ name: 'ExtensionBundleVersion', value: bundleVersion.toString() });
		else throw new Error(badArgumentError("The bundle's version", 'number or string', bundleVersion));

		if (bundleName && typeof bundleName === 'string')
			attributes.push({ name: 'ExtensionBundleName', value: bundleName });
		else if (bundleName) throw new Error(badArgumentError("The bundle's name (optional)", 'string', bundleName));

		super({ name: 'ExtensionManifest', attributes: attributes });
	}
}
