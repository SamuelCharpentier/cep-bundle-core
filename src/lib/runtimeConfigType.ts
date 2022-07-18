import type { ManifestArgument } from '@manifest/ExtensionManifest';
import { DeepPartial } from './deepPartial';
import { ExtensionListArgument } from './manifest/ExtensionList';

export type RuntimeConfig = {
	manifest: DeepPartial<ManifestArgument>;
	extensions: DeepPartial<ExtensionListArgument>;
};
