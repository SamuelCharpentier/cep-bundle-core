const isEnumToken = <T>(testedEnum: T) => {
	let generatedFunction = (token: any): token is T[keyof T] =>
		(Object as any).values(testedEnum).includes(token as T[keyof T]);
	return generatedFunction;
};
const isEnumKey = <T>(testedEnum: T) => {
	let generatedFunction = (key: any): key is keyof T => Object.keys(testedEnum).includes(key);
	return generatedFunction;
};

export enum HostEngine {
	'InCopy' = 'AICY',
	'InDesign' = 'IDSN',
	'Illustrator' = 'ILST',
	'Photoshop' = 'PHXS',
	'Prelude' = 'PRLD',
	'Premiere Pro' = 'PPRO',
	'Dreamweaver' = 'DRWV',
	'Flash Pro' = 'FLPR',
	'After Effects' = 'AEFT',
}

export const isHostEngineKey = isEnumKey(HostEngine);
export const isHostEngineValue = isEnumToken(HostEngine);

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

export const isAdobeLocaleCodesKey = isEnumKey(AdobeLocaleCodes);
export const isAdobeLocaleCodesValue = isEnumToken(AdobeLocaleCodes);

export enum UIType {
	'Panel' = 'Panel',
	'ModalDialog' = 'ModalDialog',
	'Modeless' = 'Modeless',
	'Custom' = 'Custom',
	'Embedded' = 'Embedded',
	'Dashboard' = 'Dashboard',
}
export const isUITypeKey = isEnumKey(UIType);
export const isUITypeValue = isEnumToken(UIType);

export enum IconType {
	'Normal' = 'Normal',
	'Disabled' = 'Disabled',
	'RollOver' = 'RollOver',
	'DarkNormal' = 'DarkNormal',
	'DarkRollOver' = 'DarkRollOver',
}
export const isIconTypeKey = isEnumKey(IconType);
export const isIconTypeValue = isEnumToken(IconType);
export const isIconType = <(val: any) => val is IconType>((val: any) => isIconTypeKey(val) || isIconTypeValue(val));

export enum SizesTypes {
	'screenPercentage' = 'screenPercentage',
	'size' = 'size',
	'minSize' = 'minSize',
	'maxSize' = 'maxSize',
}
export const isSizesTypesKey = isEnumKey(SizesTypes);
export const isSizesTypesValue = isEnumToken(SizesTypes);
