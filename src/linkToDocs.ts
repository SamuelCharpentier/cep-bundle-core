export const linkToDocs = (group: string, name: string) => {
	const urlEscapedName = name.replace(/ /g, '-');
	const urlEscapedGroup = group.replace(/ /g, '-');
	return `${name} (${group}) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/${urlEscapedGroup}.md#${urlEscapedName})`;
};
