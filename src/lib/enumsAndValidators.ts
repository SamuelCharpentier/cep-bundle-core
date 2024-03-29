const isEnumToken = <T>(testedEnum: T) => {
	let generatedFunction = (token: any): token is T[keyof T] =>
		(Object as any).values(testedEnum).includes(token as T[keyof T]);
	return generatedFunction;
};
const isEnumKey = <T>(testedEnum: T & {}) => {
	let generatedFunction = (key: any): key is keyof T =>
		Object.keys(testedEnum).includes(key);
	return generatedFunction;
};

const isEnumTokenOrKey = <T>(testedEnum: T & {}) => {
	return <(val: any) => val is T[keyof T] | keyof T>(
		((val) => isEnumKey(testedEnum)(val) || isEnumToken(testedEnum)(val))
	);
};

const getEnumKey = <T>(testedEnum: T & {}) => {
	return <(val: T[keyof T]) => keyof T>((val) => {
		const keyIndex = Object.values(testedEnum).indexOf(val);
		return Object.keys(testedEnum)[keyIndex] as keyof T;
	});
};

export enum HostEngine {
	'Photoshop' = 'PHXS',
	'InDesign' = 'IDSN',
	'InCopy' = 'AICY',
	'Illustrator' = 'ILST',
	'Premiere Pro' = 'PPRO',
	'Prelude' = 'PRLD',
	'After Effects' = 'AEFT',
	'Animate (Flash Pro)' = 'FLPR',
	'Audition' = 'AUDT',
	'Dreamweaver' = 'DRWV',
	'Muse' = 'MUSE',
	'Bridge' = 'KBRG',
}

export const isHostEngineKey = isEnumKey(HostEngine);
export const isHostEngineValue = isEnumToken(HostEngine);
export const isHostEngine = isEnumTokenOrKey(HostEngine);
export const getHostEngineKey = getEnumKey(HostEngine);

export enum AdobeLocaleCodes {
	'All' = 'All',
	'en_US' = 'en_US',
	'fr_FR' = 'fr_FR',
	'de_DE' = 'de_DE',
	'ja_JP' = 'ja_JP',
	'fr_CA' = 'fr_CA',
	'en_GB' = 'en_GB',
	'nl_NL' = 'nl_NL',
	'it_IT' = 'it_IT',
	'es_ES' = 'es_ES',
	'es_MX' = 'es_MX',
	'pt_BR' = 'pt_BR',
	'pt_PT' = 'pt_PT',
	'sv_SE' = 'sv_SE',
	'da_DK' = 'da_DK',
	'fi_FI' = 'fi_FI',
	'nb_NO' = 'nb_NO',
	'zh_CN' = 'zh_CN',
	'zh_TW' = 'zh_TW',
	'kr_KR' = 'kr_KR',
	'cs_CZ' = 'cs_CZ',
	'ht_HU' = 'ht_HU',
	'pl_PL' = 'pl_PL',
	'ru_RU' = 'ru_RU',
	'uk_UA' = 'uk_UA',
	'tr_TR' = 'tr_TR',
	'sk_SK' = 'sk_SK',
	'sl_SI' = 'sl_SI',
	'eu_ES' = 'eu_ES',
	'ca_ES' = 'ca_ES',
	'hr_HR' = 'hr_HR',
	'ro_RO' = 'ro_RO',
	'fr_MA' = 'fr_MA',
	'en_AE' = 'en_AE',
	'en_IL' = 'en_IL',
}

export const isAdobeLocaleCode = isEnumToken(AdobeLocaleCodes);

export enum UIType {
	'Panel' = 'Panel',
	'ModalDialog' = 'ModalDialog',
	'Modeless' = 'Modeless',
	'Custom' = 'Custom',
	'Embedded' = 'Embedded',
	'Dashboard' = 'Dashboard',
}
export const isUIType = isEnumToken(UIType);

export enum IconType {
	'normal' = 'normal',
	'disabled' = 'disabled',
	'rollOver' = 'rollOver',
	'darkNormal' = 'darkNormal',
	'darkRollOver' = 'darkRollOver',
}
export const isIconType = isEnumTokenOrKey(IconType);

export enum SizesTypes {
	'screenPercentage' = 'screenPercentage',
	'size' = 'size',
	'minSize' = 'minSize',
	'maxSize' = 'maxSize',
}
export const isSizesTypes = isEnumToken(SizesTypes);

export enum CEPVersion {
	'latest' = '11,0',
	'v11.0' = '11.0',
	'v10.0' = '10.0',
	'v9.0' = '9.0',
	'v8.0' = '8.0',
	'v7.0' = '7.0',
	'v6.1' = '6.1',
	'v6.0' = '6.0',
	'v5.0' = '5.0',
	'v4.0' = '4.0',
}

export const isCEPVersionKey = isEnumKey(CEPVersion);
export const isCEPVersionValue = isEnumToken(CEPVersion);
export const isCEPVersion = isEnumTokenOrKey(CEPVersion);
