import { Attribute, AttributeArgument } from './Attribute';
import { StringContent, StringContentArgument } from './StringContent';
import { badArgumentError } from '../errorMessages';
import { isValidContext, Context, ContextFilter } from './Context';

type XMLStringContentArgument = string | number | StringContentArgument;

export type XMLElementArgument = {
	name: string;
	attributes?: AttributeArgument | AttributeArgument[];
	content?: XMLElement | XMLElement[] | XMLStringContentArgument;
	context?: ContextFilter;
};

function isValidNameArgument(name: any): name is { name: string } {
	if (typeof name !== 'string')
		throw new Error(
			badArgumentError("XMLElement's argument.name", 'a string', name),
		);
	if (name.length === 0)
		throw new Error(
			badArgumentError(
				"XMLElement's argument.name",
				'a non-empty string',
				name,
			),
		);
	if (!/^[\w\.-]+$/.test(name))
		throw new Error(
			badArgumentError(
				"XMLElement's argument.name",
				'a string containing only alphanumeric characters, underscores, hyphens and periods',
				name,
			),
		);
	return true;
}

function IsValidAttributeArgument(
	attributes: any,
): attributes is AttributeArgument {
	const validate = (attribute: any) =>
		attribute === undefined ||
		(typeof attribute === 'object' &&
			!Array.isArray(attribute) &&
			Object.keys(attribute).length > 0);

	if (Array.isArray(attributes) && attributes.length > 0) {
		for (const attribute of attributes) {
			if (!validate(attribute)) {
				throw new Error(
					badArgumentError(
						"When provided as an array, each XMLElement's argument.attribute (optional)",
						'an AttributeArgument (type)',
						attribute,
					),
				);
			}
		}
	} else {
		if (!validate(attributes)) {
			throw new Error(
				badArgumentError(
					"XMLElement's argument.attributes (optional)",
					'an AttributeArgument (type) or an array of AttributeArgument',
					attributes,
				),
			);
		}
	}
	return true;
}

function isValidStringContentArgument(
	content: any,
): content is XMLStringContentArgument {
	if (typeof content === 'number') return true;
	if (typeof content === 'string') {
		if (content.trim().length === 0)
			throw new Error(
				badArgumentError(
					"When provided as a string, XMLElement's argument.content",
					'a non-empty string',
					content,
				),
			);
		return true;
	}
	if (typeof content === 'object') {
		if (!(content instanceof StringContent))
			throw new Error(
				badArgumentError(
					"When provided as an object, XMLElement's argument.content (optional)",
					'a StringContent (class) instance',
					content,
				),
			);
		return true;
	}
	return false;
}

function isValidContentArgument(
	content: any,
): content is XMLElement | XMLElement[] | XMLStringContentArgument | undefined {
	if (content === undefined) return true;
	if (content instanceof XMLElement) return true;
	if (Array.isArray(content)) {
		if (content.length === 0) return true;
		for (const element of content) {
			if (!(element instanceof XMLElement)) {
				throw new Error(
					badArgumentError(
						"When provided as an array, XMLElement's argument.content (optional)",
						'an XMLElement (class)',
						element,
					),
				);
			}
		}
		return true;
	}
	if (!isValidStringContentArgument(content))
		throw new Error(
			badArgumentError(
				"XMLElement's argument.content (optional)",
				'an XMLElement (class), an array of XMLElement, a StringContent (class), a string or a number',
				content,
			),
		);

	return true;
}

function isValidContextArgument(context: any): context is ContextFilter {
	if (context === undefined) return true;
	if (typeof context !== 'function')
		throw new Error(
			badArgumentError(
				"XMLElement's argument.context (optional)",
				'a function',
				context,
			),
		);
	return true;
}

function isXMLElementArgument(arg: any): arg is XMLElementArgument {
	if (typeof arg !== 'object' || Array.isArray(arg))
		throw badArgumentError(
			'XMLElement argument',
			'an XMLElementArgument (type)',
			arg,
		);
	return (
		isValidNameArgument(arg.name) &&
		IsValidAttributeArgument(arg.attributes) &&
		isValidContentArgument(arg.content) &&
		isValidContextArgument(arg.context)
	);
}

function getArrayOfAttributes(
	attributes: AttributeArgument | AttributeArgument[],
): Attribute[] | undefined {
	attributes = Array.isArray(attributes) ? attributes : [attributes];
	let attributeArray: Attribute[] = [];
	attributes.forEach((attribute) => {
		attributeArray.push(new Attribute(attribute));
	});
	return attributeArray;
}

function getArrayOfContent(
	content: XMLElement | XMLElement[] | XMLStringContentArgument,
): XMLElement[] | StringContent {
	return Array.isArray(content)
		? content
		: content instanceof XMLElement
		? [content]
		: new StringContent(content);
}

export class XMLElement {
	readonly name: string;
	readonly attributes?: Attribute[];
	readonly content?: XMLElement[] | StringContent;
	private context?: ContextFilter;

	constructor(arg: any) {
		this.name = '';
		if (isXMLElementArgument(arg)) {
			const { name, attributes, content, context } = arg;
			this.name = name;
			this.context = context;
			if (attributes !== undefined)
				this.attributes = getArrayOfAttributes(attributes);

			if (content !== undefined) {
				this.content = getArrayOfContent(content);
			}
		}
	}
	xml(parents: Context[] = [], indent: number = 0): string {
		const getAttributes = (attributes: Attribute[] | undefined): string => {
			if (attributes === undefined) return '';
			let attributesString = '';
			attributes.forEach((attribute) => {
				attributesString += attribute.xml(parents);
			});
			return attributesString;
		};

		const getContent = (
			content: XMLElement[] | StringContent | undefined,
		): string => {
			if (content === undefined) return '';
			if (content instanceof StringContent) {
				return content.xml(parents);
			} else {
				let xml = '';
				for (const element of content) {
					xml += element.xml(parents, indent + 1);
				}
				if (xml !== '') xml = `\n${xml}${'\t'.repeat(indent)}`;
				return xml;
			}
		};

		const outputXML = (): string => {
			if (isValidContext(this.constructor.name))
				parents.push(this.constructor.name);
			const attributesString = getAttributes(this.attributes);
			const contentString = getContent(this.content);
			if (attributesString === '' && contentString === '') return '';
			let result = `${'\t'.repeat(indent)}<${
				this.name
			}${attributesString}`;
			if (contentString === '') result += '/>\n';
			else result += `>${contentString}</${this.name}>\n`;
			return result;
		};
		if (!!this.context) {
			if (this.context(parents)) {
				return outputXML();
			}
		} else {
			return outputXML();
		}
		return '';
	}
}
