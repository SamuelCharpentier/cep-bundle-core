import {
	AdobeLocaleCodes,
	isAdobeLocaleCode,
} from '@src/lib/enumsAndValidators';
import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs';
import { defaultManifestConfigs } from '@src/manifestConfigs/defaultManifestConfigs';
import { isAll } from '@src/lib/typesAndValidators';

export function getLocaleList(
	receivedExecutionEnvironment: _UserManifestConfigs['executionEnvironment'],
): AdobeLocaleCodes[] {
	let localeList: AdobeLocaleCodes[] = [];
	if (
		receivedExecutionEnvironment === undefined ||
		receivedExecutionEnvironment.localeList === undefined
	) {
		return [defaultManifestConfigs.executionEnvironment.localeList];
	}
	let receivedLocaleList = receivedExecutionEnvironment.localeList;
	receivedLocaleList =
		receivedLocaleList instanceof Array
			? receivedLocaleList
			: [receivedLocaleList];
	for (const locale of receivedLocaleList) {
		if (locale === AdobeLocaleCodes.All || isAll(locale)) {
			return [AdobeLocaleCodes.All];
		}
		if (isAdobeLocaleCode(locale)) {
			localeList.push(locale);
		}
	}
	return localeList;
}
