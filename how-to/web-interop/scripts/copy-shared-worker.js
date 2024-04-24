const fs = require('fs');
const path = require('path');

const sharedWorkerPath = `${path.dirname(require.resolve('@openfin/core-web'))}/shared-worker.js`;

const targetJSdirectory = path.resolve(__dirname, '..', 'public', 'js');
const targetSharedWorkerPath = path.join(targetJSdirectory, 'shared-worker.bundle.js');

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
