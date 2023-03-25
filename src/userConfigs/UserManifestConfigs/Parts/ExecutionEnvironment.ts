import { badValueError, GoodBadList } from '@src/lib/errorMessages';
import {
	AdobeLocaleCodes,
	isAdobeLocaleCode,
} from '@src/lib/enumsAndValidators';
import { linkToDocs } from '@src/linkToDocs';
import { needsValidation } from '@src/userConfigs/needsValidation';

export type ExecutionEnvironment =
	| undefined
	| {
			localeList?:
				| (AdobeLocaleCodes | keyof typeof AdobeLocaleCodes)
				| (AdobeLocaleCodes | keyof typeof AdobeLocaleCodes)[];
	  };
export function isExecutionEnvironment(
	arg: any,
	parents: string[],
	partial: { partial: true },
): arg is Partial<ExecutionEnvironment>;
export function isExecutionEnvironment(
	arg: any,
	parents: string[],
	partial?: { partial: false },
): arg is ExecutionEnvironment;
export function isExecutionEnvironment(
	arg: any,
	parents: string[],
	partial?: { partial: boolean },
): arg is Partial<ExecutionEnvironment> | ExecutionEnvironment;
export function isExecutionEnvironment(
	received: any,
	parents: string[] = [],
	partial: { partial: boolean } = { partial: false },
) {
	parents = [...parents];
	if (received === undefined) return true;
	if (
		needsValidation(received, partial, true) &&
		(received === null ||
			typeof received !== 'object' ||
			received instanceof Array)
	) {
		throw badValueError({
			propertyName: parents.join('.'),
			required: true,
			expectedPropertyType: `an ${linkToDocs(
				'user manifest configs type',
				'ExecutionEnvironment',
			)}`,
			received,
		});
	}
	const localeListExpectedMessage = `an AdobeLocaleCodes or an array of ${linkToDocs(
		'manifest enum',
		'AdobeLocaleCodes',
	)}`;
	if (received.localeList === undefined) return true;
	if (
		needsValidation(received.localeList, partial, true) &&
		(received.localeList === null ||
			(typeof received.localeList !== 'string' &&
				!(received.localeList instanceof Array)) ||
			received.localeList.length === 0)
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
}
