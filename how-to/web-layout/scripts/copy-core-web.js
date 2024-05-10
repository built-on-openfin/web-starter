const fs = require('fs');
const path = require('path');

const sharedWorkerPath = `${path.dirname(require.resolve('@openfin/core-web'))}/shared-worker.js`;
const cssPath = `${path.dirname(require.resolve('@openfin/core-web'))}/styles.css`;

const targetJSdirectory = path.resolve(__dirname, '..', 'public', 'js');
const targetSharedWorkerPath = path.join(targetJSdirectory, 'shared-worker.bundle.js');

const targetCSSdirectory = path.resolve(__dirname, '..', 'public', 'style');
const targetCSSPath = path.join(targetCSSdirectory, 'core-web-styles.css');

fs.mkdir(targetJSdirectory, { recursive: true }, (createdDirectoryError) => {
	if (createdDirectoryError) {
		console.error(`Error creating target directory: ${targetJSdirectory}`);
		throw createdDirectoryError;
	}
	console.log(
		`${targetJSdirectory} directory was created or already existed. Copying source shared-worker.js to target directory.`
	);
	fs.copyFile(sharedWorkerPath, targetSharedWorkerPath, (copyFileError) => {
		if (copyFileError) {
			throw copyFileError;
		}
		console.log(`shared-worker.js was copied to target directory: ${targetSharedWorkerPath}`);
	});
});

fs.mkdir(targetCSSdirectory, { recursive: true }, (createdDirectoryError) => {
	if (createdDirectoryError) {
		console.error(`Error creating target directory: ${targetCSSdirectory}`);
		throw createdDirectoryError;
	}
	console.log(
		`${targetCSSdirectory} directory was created or already existed. Copying source styles.css to target directory.`
	);
	fs.copyFile(cssPath, targetCSSPath, (copyFileError) => {
		if (copyFileError) {
			throw copyFileError;
		}
		console.log(`styles.css was copied to target directory: ${targetCSSPath}`);
	});
});
