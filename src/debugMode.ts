import { execSync } from 'child_process';
import os from 'os';

function templateDebug(formatter: any) {
	return [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(formatter).join(os.EOL);
}

export function enablePlayerDebugMode() {
	// enable unsigned extensions
	if (process.platform === 'darwin') {
		// On a Mac?
		execSync(templateDebug((i: number) => `defaults write com.adobe.CSXS.${i} PlayerDebugMode 1`));
	} else {
		execSync(
			templateDebug(
				// In REGEDIT
				(i: number) => `REG ADD HKCU\\Software\\Adobe\\CSXS.${i} /f /v PlayerDebugMode /t REG_SZ /d 1`,
			),
		);
	}
}

export function disablePlayerDebugMode() {
	// disable unsigned extensions
	if (process.platform === 'darwin') {
		// On a Mac?
		execSync(templateDebug((i: number) => `defaults write com.adobe.CSXS.${i} PlayerDebugMode 0`));
	} else {
		// In REGEDIT
		execSync(templateDebug((i: number) => `REG DELETE HKCU\\Software\\Adobe\\CSXS.${i} /f /v PlayerDebugMode`));
	}
}
