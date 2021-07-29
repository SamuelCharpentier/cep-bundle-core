import { XMLElement } from './XMLElement';
import { RangedVersion, isRangedVersion } from './typesAndValidators';
export class RequiredRuntimeList extends XMLElement {
	constructor(content?: RequiredRuntime | RequiredRuntime[]) {
		if (content !== undefined && content instanceof RequiredRuntime) content = [content];
		else if (content !== undefined && Array.isArray(content)) {
			const filteredContent = content.filter((element) => element instanceof RequiredRuntime);
			if (filteredContent.length !== content.length) {
				console.warn(`Some of the elements in the array of RequiredRuntime were ignored because they weren't an instance of RequiredRuntime. 
				Received ${content}
				Kept ${filteredContent}`);
				content = filteredContent;
			}
		} else if (content !== undefined)
			console.warn(
				`Content of RequiredRuntimeList must be of type RequiredRuntime (class) or RequiredRuntime[], ${
					typeof content === 'string' ? `'${content}'` : content
				} (${typeof content}) received`,
			);
		('');
		super({ name: 'RequiredRuntimeList', content });
	}
}
export class RequiredRuntime extends XMLElement {
	constructor(version: RangedVersion) {
		if (version === undefined || !isRangedVersion(version))
			throw new Error(badArgumentError(`Each RequiredRuntime Element need a version`, `RangedVersion`, version));
		super({
			name: 'RequiredRuntime',
			attributes: [
				{ name: 'Name', value: 'CSXS' },
				{ name: 'Version', value: version.toString() },
			],
		});
	}
}
