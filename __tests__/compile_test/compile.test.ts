import { compile } from '../../src/compile';
import fsExtra from 'fs-extra';
import fs from 'fs';
import path from 'path';

const outputFolderName = 'dist';
let testIndex = 0;
const root = './__tests__/compile_test';
const outputGroup = 'outputs';

function cleanup(folder: string) {
	fsExtra.ensureDirSync(folder);
	let contents = fs.readdirSync(folder);
	contents.forEach((file) => {
		let filePath = path.join(folder, file);
		let stat = fs.statSync(filePath);
		if (stat.isFile()) {
			fs.unlinkSync(filePath);
		} else {
			cleanup(filePath);
			fs.rmdirSync(filePath);
		}
	});
}

beforeAll(async () => {
	cleanup(path.join(root, outputGroup));
});

afterAll(async () => {
	//cleanup(path.join(root, outputGroup));
});

function getCurrentTestOutputFolder() {
	const outputFolder = path.join(outputGroup, outputFolderName + testIndex);
	testIndex++;
	return outputFolder;
}

describe('compile', () => {
	it('should compile', async () => {
		const outputFolder = getCurrentTestOutputFolder();
		await expect(async () => {
			await compile({
				isDev: true,
				root,
				outputFolder,
			});
		}).not.toThrow();
		expect(fs.readdirSync(path.join(root, outputFolder))).toEqual(
			expect.arrayContaining(['CSXS', '.debug', 'my.extension.html']),
		);
		expect(fs.readdirSync(path.join(root, outputFolder))).not.toEqual(
			expect.arrayContaining(['.debug.txt']),
		);
	});
	it('should', () => {
		const outputFolder = getCurrentTestOutputFolder();
		expect(() => {
			compile(
				{
					isDev: true,
					root,
					devHostPort: 1919,
					outputFolder,
				},
				{
					manifest: {
						extensionBundle: { name: 'Some Extension' },
						authorName: 'CoolGuy69',
					},
				},
			);
		}).not.toThrow();
	});
});
