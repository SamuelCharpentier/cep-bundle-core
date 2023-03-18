import {
	AdobeLocaleCodes,
	isAdobeLocaleCode,
} from '@src/lib/enumsAndValidators';
import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs';

export function getLocaleList(
	receivedLocaleList: _UserManifestConfigs['executionEnvironment']['localeList'],
): AdobeLocaleCodes[] {
	let localeList: AdobeLocaleCodes[] = [];
	receivedLocaleList =
		receivedLocaleList instanceof Array
			? receivedLocaleList
			: [receivedLocaleList];
	receivedLocaleList.forEach((locale) => {
		if (isAdobeLocaleCode(locale)) {
			localeList.push(locale);
		}
	});
	return localeList;
}
