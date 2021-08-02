import { Attribute } from './Attribute';
import { StringContent } from './StringContent';
import { AttributeArgument } from './typesAndValidators';
import { badArgumentError } from './errorMessages';
import { isValidContext, Context } from './Context';
export class XMLElement {
	readonly name: string;
	readonly attributes?: Attribute[];
	readonly content?: XMLElement[] | StringContent;
	private context?: (parents: string[]) => boolean;
	constructor({
		name,
		attributes,
		content,
		context,
	}: {
		name: string;
		attributes?: AttributeArgument | AttributeArgument[];
		content?: XMLElement | XMLElement[] | { value: string; context?: (parents: string[]) => boolean } | string;
		context?: (parents: string[]) => boolean;
	}) {
		if (typeof name !== 'string') throw new Error(badArgumentError("XML Element's name", 'string', name));

		this.name = name;
		if (context && {}.toString.call(context) === '[object Function]') this.context = context;

		if (attributes !== undefined) {
			this.attributes = [];
			if (typeof attributes === 'object' && attributes instanceof Array) {
				attributes.forEach((attribute) => {
					if (attribute.value) this.attributes?.push(new Attribute(attribute));
				});
			} else if (attributes instanceof Object && attributes.value) this.attributes = [new Attribute(attributes)];
		}

		if (content !== undefined) {
			if (content instanceof Array && content[0] instanceof XMLElement) this.content = content;
			else if (content instanceof XMLElement) this.content = [content];
			else if (
				typeof content === 'object' &&
				!(content instanceof XMLElement) &&
				!(content instanceof Array) &&
				typeof content.value === 'string'
			)
				this.content = new StringContent(content);
			else if (typeof content === 'string') this.content = new StringContent({ value: content });
		}
	}
	xml(parents: Context[] = [], indent: number = 0): string {
		const containsAttributeOrContent = (str: string): boolean => {
			const regexp = new RegExp(/<.* .*=".*" ?\/?>|(<.*?>)+([^<\r\n])+(<\/.*?>)+/);
			return regexp.test(str);
		};
		const outputXML = (): string => {
			let result = `${'\t'.repeat(indent)}<${this.name}`;
			if (this.attributes !== undefined && this.attributes instanceof Array && this.attributes?.length > 0) {
				this.attributes.forEach((attribute) => {
					if (attribute.context) {
						if (attribute.context(parents)) result += ` ${attribute.name}="${attribute.value}"`;
					} else result += ` ${attribute.name}="${attribute.value}"`;
				});
			}
			if (this.content !== undefined) {
				if (isValidContext(this.constructor.name)) parents.push(this.constructor.name);
				let contentXML = '';
				if (this.content instanceof StringContent) contentXML += this.content.xml(parents);
				else if (this.content instanceof Array) {
					this.content.forEach((content) => {
						contentXML += content.xml(parents, indent + 1);
					});
				}
				if (contentXML === '') result += '/>\n';
				else {
					result += '>';
					result += !(this.content instanceof StringContent) ? '\n' : '';
					result += contentXML;
					result += !(this.content instanceof StringContent) ? '\t'.repeat(indent) : '';
					result += `</${this.name}>\n`;
				}
			} else {
				result += '/>\n';
			}
			if (containsAttributeOrContent(result)) return result;
			return '';
		};
		if (this.context) {
			if (this.context(parents)) {
				return outputXML();
			}
		} else {
			return outputXML();
		}
		return '';
	}
}
