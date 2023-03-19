import { badValueError, GoodBadList } from '@src/lib/errorMessages';
import {
	AdobeLocaleCodes,
	isAdobeLocaleCode,
} from '@src/lib/enumsAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type ExecutionEnvironment =
	| undefined
	| {
			localeList?:
				| (AdobeLocaleCodes | keyof typeof AdobeLocaleCodes)
				| (AdobeLocaleCodes | keyof typeof AdobeLocaleCodes)[];
	  };
/**
 *
 *
 * @param {*} received
 * @param {string[]} [parents=[]]
 * @return {boolean}  {received is ExecutionEnvironment}
 */
export const isExecutionEnvironment = (
	received: any,
	parents: string[] = [],
): received is ExecutionEnvironment => {
	parents = [...parents];
	if (received === undefined) return true;
	if (
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array
	) {
		throw badValueError({
			propertyName: [...parents, 'executionEnvironment'].join('.'),
			required: true,
			expectedPropertyType: `an ${linkToDocs(
				'user manifest configs type',
				'ExecutionEnvironment',
			)}`,
			received,
		});
	}
	parents.push('executionEnvironment');
	const localeListExpectedMessage = `an AdobeLocaleCodes or an array of ${linkToDocs(
		'manifest enum',
		'AdobeLocaleCodes',
	)}`;
	if (received.localeList === undefined) return true;
	if (
		received.localeList === null ||
		(typeof received.localeList !== 'string' &&
			!(received.localeList instanceof Array)) ||
		received.localeList.length === 0
	) {
		throw badValueError({
			propertyName: [...parents, 'localeList'].join('.'),
			required: true,
			expectedPropertyType: localeListExpectedMessage,
			received: received.localeList,
		});
	}
	const localeList =
		received.localeList instanceof Array
			? received.localeList
			: [received.localeList];
	let goodBadLocaleList = new GoodBadList();
	for (const locale of localeList) {
		if (locale === undefined || !isAdobeLocaleCode(locale)) {
			goodBadLocaleList.bad.push(locale);
			continue;
		}
		goodBadLocaleList.good.push(locale);
	}

	if (goodBadLocaleList.bad.length > 0) {
		throw badValueError({
			propertyName: [...parents, 'localeList'].join('.'),
			expectedPropertyType: localeListExpectedMessage,
			required: true,
			received: goodBadLocaleList,
		});
	}
	return true;
};
