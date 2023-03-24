import {
	AdobeLocaleCodes,
	CEPVersion,
	HostEngine,
	isCEPVersionKey,
	isCEPVersionValue,
} from '@src/lib/enumsAndValidators';
import {
	EmailAddress,
	RangedVersion,
	VersionNumber,
	isInt,
} from '@src/lib/typesAndValidators';
import { InvisibleDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/InvisibleDispatchInfo';
import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';
import { VisibleDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/VisibleDispatchInfo';
import { getLocaleList } from './convertManifestConfigs/getLocaleList';
import { getExecutionEnvironmentHostList } from './convertManifestConfigs/getExecutionEnvironmentHostList';
import { getExtensions } from './convertManifestConfigs/getExtensions';

export type ManifestConfigs = {
	extensionBundle: {
		id: string;
		version?: VersionNumber;
		name?: string;
		cepVersion: CEPVersion;
	};
	authorName?: string;
	contact?: EmailAddress;
	legal?: URL;
	abstract?: URL;
	executionEnvironment: {
		hostList: {
			host: HostEngine;
			version: RangedVersion; // calculated to include all possible version of all extensions[x].hostList
		}[]; // compiled from all extensions[x].hostList
		localeList: AdobeLocaleCodes[];
		CSXSVersion: CEPVersion; // from extensionBundle.cepVersion
	};
	extensions: {
		id: string;
		version?: VersionNumber;
		hostList: {
			host: HostEngine;
			version: RangedVersion;
			debugPort: number;
		}[];
		dispatchInfo: (VisibleDispatchInfo | InvisibleDispatchInfo)[];
		dependencyList?: {
			id: string;
			version?: VersionNumber;
		}[];
	}[];
};

export const convertToManifestConfigs = (
	userManifestConfigs: _UserManifestConfigs,
): ManifestConfigs => {
	let {
		extensionBundle,
		authorName,
		contact,
		legal,
		abstract,
		executionEnvironment: receivedExecutionEnvironment,
		extensions: receivedExtensions,
	} = userManifestConfigs;

	if (legal !== undefined && typeof legal === 'string') {
		legal = new URL(legal);
	}
	if (abstract !== undefined && typeof abstract === 'string') {
		abstract = new URL(abstract);
	}
	let cepVersion: CEPVersion = CEPVersion.latest;
	if (extensionBundle.cepVersion !== undefined) {
		if (isCEPVersionKey(extensionBundle.cepVersion)) {
			cepVersion = CEPVersion[extensionBundle.cepVersion];
		} else if (isCEPVersionValue(extensionBundle.cepVersion)) {
			cepVersion = extensionBundle.cepVersion;
		}
	}
	const extensions = getExtensions(receivedExtensions);
	let hostList: ManifestConfigs['executionEnvironment']['hostList'] =
		getExecutionEnvironmentHostList(extensions);

	let localeList: AdobeLocaleCodes[] = getLocaleList(
		receivedExecutionEnvironment,
	);

	let executionEnvironment: ManifestConfigs['executionEnvironment'] = {
		hostList,
		localeList,
		CSXSVersion: cepVersion,
	};
	const manifestConfigs: ManifestConfigs = {
		extensionBundle: {
			...extensionBundle,
			cepVersion,
		},
		authorName,
		contact,
		legal,
		abstract,
		executionEnvironment,
		extensions,
	};
	return manifestConfigs;
};
