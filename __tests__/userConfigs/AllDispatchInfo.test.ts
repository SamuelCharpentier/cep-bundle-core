import {
	isAllDispatchInfo,
	AllDispatchInfo,
} from '@src/userConfigs/AllDispatchInfo';
import { VisibleDispatchInfo } from '@src/userConfigs/VisibleDispatchInfo';
import { _Extension } from '@src/userConfigs/Extension';
import { getArgumentCases } from '@tests/argumentCases';
import { exampleUserManifestConfigs } from './userConfigs.example';
import { InvisibleDispatchInfo } from '@src/userConfigs/InvisibleDispatchInfo';

const validVisibleDispatchInfo: VisibleDispatchInfo = (
	exampleUserManifestConfigs.extensions as _Extension
).dispatchInfo as VisibleDispatchInfo;

const validInvisibleDispatchInfo: InvisibleDispatchInfo = {
	ui: { type: 'Custom' },
	resources: { scriptPath: './scripts/main.jsx' },
};

describe('isAllDispatchInfo', () => {
	it('is defined', () => {
		expect(isAllDispatchInfo).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, dispatchInfo, errorMessage) => {
			expect(() => {
				isAllDispatchInfo(dispatchInfo);
			}).toThrowError(
				`Validation Error: extensions.dispatchInfo (required) must be provided as a AllDispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllDispatchInfo), ${errorMessage} received`,
			);
		},
	);
	it('cumulates and throws errors from isDispatchInfo', () => {
		expect(() => {
			isAllDispatchInfo({
				ui: {
					type: 'Custom',
				},
				resources: {
					scriptPath: 'c:/not/a/relative/path.jsx',
				},
			});
		}).toThrowError(
			`Validation Error: extensions.dispatchInfo.resources.scriptPath (optional or required depending on the context) must be provided as a RelativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#RelativePath), 'c:/not/a/relative/path.jsx' (string) received`,
		);
	});
	const validAllDispatchInfoCases: [string, AllDispatchInfo][] = [
		['VisibleDispatchInfo', validVisibleDispatchInfo],
		['InvisibleDispatchInfo', validInvisibleDispatchInfo],
		[
			'array of AllDispatchInfo',
			[validVisibleDispatchInfo, validInvisibleDispatchInfo],
		],
	];
	test.each(validAllDispatchInfoCases)(
		'returns true when given %s',
		(description, allDispatchInfo) => {
			expect(isAllDispatchInfo(allDispatchInfo)).toBeTruthy();
		},
	);
});
